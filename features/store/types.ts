export interface CreateResourceState {
  isOpen: boolean;
  openCreatePanel: () => void;
  closeCreatePanel: () => void;
}

export interface UpdateResourceState {
  id: string;
  openEditPanel: (id: string) => void;
  closeEditPanel: () => void;
}
