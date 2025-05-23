export interface CreateResourceState {
  panels: {
    accountOpen: boolean;
    categoryOpen: boolean;
    transactionOpen: boolean;
  };
  openCreatePanel: (newState: Partial<CreateResourceState["panels"]>) => void;
  closeCreatePanel: () => void;
}

export interface UpdateResourceState {
  id: string;
  openEditPanel: (
    id: string,
    newState: Partial<CreateResourceState["panels"]>,
  ) => void;
  closeEditPanel: () => void;
}
