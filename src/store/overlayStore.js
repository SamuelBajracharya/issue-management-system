import {create} from "zustand";

export const useAddIssueOverlay = create((set) => ({
  isAddOverlay: false,
  openAddOverlay: () => set({isAddOverlay: true}),
  closeAddOverlay: () => set({isAddOverlay: false}),
}));
