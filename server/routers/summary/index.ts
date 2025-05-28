import { subDays, parse, differenceInDays } from "date-fns";

import { protectedProcedure, router } from "@/server/trpc";
import { summaryQueryParamsSchema } from "@/server/schema";
import { DatabaseInstance } from "@/server/db/conn";
import { accounts, categories, transactions } from "@/server/db/models";
import { and, asc, desc, eq, gte, lt, lte, sql, sum } from "drizzle-orm";
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils";

async function getFinancialData(
  db: DatabaseInstance,
  accountId: string | undefined,
  userId: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    const [records] = await db
      .select({
        income:
          sql`SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number,
          ),
        expense:
          sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number,
          ),
        remaining: sum(transactions.amount).mapWith(Number),
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.account, accounts.id))
      .where(
        and(
          accountId ? eq(transactions.account, accountId) : undefined,
          eq(accounts.userId, userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate),
        ),
      );

    return records;
  } catch (error) {
    console.log("Error in getFinancialData: ", error);
  }
}

export const SummaryRouter = router({
  getSummary: protectedProcedure
    .input(summaryQueryParamsSchema)
    .query(async ({ ctx, input }) => {
      const fallbackToDate = new Date();
      const fallbackFromDate = subDays(fallbackToDate, 10);

      const startDate = input.from
        ? parse(input.from, "yyyy-MM-dd", new Date())
        : fallbackFromDate;

      const endDate = input.to
        ? parse(input.to, "yyyy-MM-dd", new Date())
        : fallbackToDate;

      const periodLength = differenceInDays(endDate, startDate) + 1;
      const lastPeriodStart = subDays(startDate, periodLength);
      const lastPeriodEnd = subDays(endDate, periodLength);

      const currentPeriodFinancialData = await getFinancialData(
        ctx.db,
        input.accountId,
        ctx.auth.userId,
        startDate,
        endDate,
      );

      const previousPeriodFinancialData = await getFinancialData(
        ctx.db,
        input.accountId,
        ctx.auth.userId,
        lastPeriodStart,
        lastPeriodEnd,
      );

      const incomeChange = calculatePercentageChange(
        currentPeriodFinancialData?.income ?? 0,
        previousPeriodFinancialData?.income ?? 0,
      );

      const expenseChange = calculatePercentageChange(
        currentPeriodFinancialData?.expense ?? 0,
        previousPeriodFinancialData?.expense ?? 0,
      );

      const remainingChange = calculatePercentageChange(
        currentPeriodFinancialData?.remaining ?? 0,
        previousPeriodFinancialData?.remaining ?? 0,
      );

      const byCategory = await ctx.db
        .select({
          value: sql`SUM(ABS(${transactions.amount}))`
            .mapWith(Number)
            .as("value"),
          name: categories.name,
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.account, accounts.id))
        .innerJoin(categories, eq(transactions.category, categories.id))
        .where(
          and(
            input.accountId
              ? eq(transactions.account, input.accountId)
              : undefined,
            eq(accounts.userId, ctx.auth.userId),
            lt(transactions.amount, 0),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
          ),
        )
        .groupBy(categories.name)
        .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`));

      const groupedTxns = byCategory.slice(0, 3);
      const rest = byCategory.slice(3);

      if (rest.length > 0) {
        groupedTxns.push({
          name: "Other",
          value: rest.reduce((total, cat) => total + cat.value, 0),
        });
      }

      const activeDays = await ctx.db
        .select({
          date: transactions.date,
          income:
            sql`SUM(CASE WHEN ${transactions.amount} > 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
              Number,
            ),
          expense:
            sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
              Number,
            ),
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.account, accounts.id))
        .where(
          and(
            input.accountId
              ? eq(transactions.account, input.accountId)
              : undefined,
            eq(accounts.userId, ctx.auth.userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate),
          ),
        )
        .groupBy(transactions.date)
        .orderBy(asc(transactions.date));

      const days = fillMissingDays({ activeDays, startDate, endDate });

      return {
        summary: {
          currentPeriodFinancialData,
          previousPeriodFinancialData,
          incomeChange,
          expenseChange,
          remainingChange,
          TxnsByCategory: groupedTxns,
          days,
        },
      };
    }),
});
