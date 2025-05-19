export interface CreateAccountState {
  isOpen: boolean;
  openCreatePanel: () => void;
  closeCreatePanel: () => void;
}

export interface UpdateAccountState {
  id: string;
  openEditPanel: (id: string) => void;
  closeEditPanel: () => void;
}
