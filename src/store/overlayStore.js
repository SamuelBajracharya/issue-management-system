import {create} from "zustand";

export const useAddIssueOverlay = create((set) => ({
  isAddOverlay: false,
  openAddOverlay: () => set({isAddOverlay: true}),
  closeAddOverlay: () => set({isAddOverlay: false}),
}));

export const useEditIssueOverlay = create((set) => ({
  isEditOverlay: false,
  openEditOverlay: () => set({isEditOverlay: true}),
  closeEditOverlay: () => set({isEditOverlay: false}),
}))

export const useConfirmationOverlay = create((set) => ({
  isConfirmationOverlay: false,
  openConfirmationOverlay: () => set({isConfirmationOverlay: true}),
  closeConfirmationOverlay: () => set({isConfirmationOverlay: false}),
}))