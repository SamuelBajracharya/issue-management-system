// store/authStore.js or .ts
import {create} from 'zustand';

export const useProfileData = create((set) => ({
  user: null,
  login: (userData) => set({user: userData}),
  logout: () => set({user: null}),
}));
