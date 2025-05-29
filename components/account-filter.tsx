"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "./ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

const AccountFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const accountId = params.get("accountId") || "all";
  const to = params.get("to") || "";
  const from = params.get("from") || "";

  const { data, isLoading } = useGetAccounts();
  const { isLoading: summaryLoading } = useGetSummary();

  const onSelectValueChange = (value: string) => {
    const q = { accountId: value, from, to };

    if (value === "all") {
      q.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: q,
      },
      { skipEmptyString: true, skipNull: true },
    );

    console.log({ url });

    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onSelectValueChange}
      disabled={isLoading || summaryLoading}
    >
      <SelectTrigger className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white transition outline-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto">
        <SelectValue placeholder="Select Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Accounts</SelectItem>
        {data?.accounts.map((acc) => (
          <SelectItem key={acc.id} value={acc.id}>
            {acc.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountFilter;
