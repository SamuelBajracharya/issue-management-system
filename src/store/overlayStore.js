import {create} from "zustand";

export const useAddOverlay = create((set) => ({
  isAddOverlay: false,
  openAddOverlay: () => set({isAddOverlay: true}),
  closeAddOverlay: () => set({isAddOverlay: false}),
}));

export const useEditOverlay = create((set) => ({
  isEditOverlay: false,
  openEditOverlay: () => set({isEditOverlay: true}),
  closeEditOverlay: () => set({isEditOverlay: false}),
}))

export const useConfirmationOverlay = create((set) => ({
  isConfirmationOverlay: false,
  openConfirmationOverlay: () => set({isConfirmationOverlay: true}),
  closeConfirmationOverlay: () => set({isConfirmationOverlay: false}),
}))

export const useDetailsOverlay = create((set) => ({
  isDetailsOverlay: false,
  selectedIssueId: null,
  openDetailsOverlay: (id) => set({isDetailsOverlay: true, selectedIssueId: id}),
  closeDetailsOverlay: () => set({isDetailsOverlay: false, selectedIssueId: null}),
}));

export const useResolveOverlay = create((set) => ({
  isResolveOverlay: false,
  selectedIssueId: null,
  openResolveOverlay: (id) => set({isResolveOverlay: true, selectedIssueId: id}),
  closeResolveOverlay: () => set({isResolveOverlay: false, selectedIssueId: null}),
}))