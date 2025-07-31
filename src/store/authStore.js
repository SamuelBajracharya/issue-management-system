// store/authStore.js or .ts
import {create} from 'zustand';

export const useProfileData = create((set) => ({
  user: null,
  login: (userData) => set({user: userData}),
  logout: () => set({user: null}),
}));


export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isLoading: true,
  setAuth: (data) => {
    if (data) set({user: data, role: data.role, isLoading: false});
    else set({user: null, role: null, isLoading: false});
  },
}));
