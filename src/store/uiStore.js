import {create} from 'zustand';

export const useDarkToggleStore = create((set) => ({
  isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) ?? false,
  setIsDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return {isDarkMode: newMode};
    }),
}));


export const useSidebarCollapsed = create((set) => ({
  userSidebarCollapsed: JSON.parse(localStorage.getItem('userSidebarCollapsed')) ?? false,
  adminSidebarCollapsed: JSON.parse(localStorage.getItem('adminSidebarCollapsed')) ?? false,
  superAdminSidebarCollapsed: JSON.parse(localStorage.getItem('superAdminSidebarCollapsed')) ?? false,
  toggleUserSidebar: () =>
    set((state) => {
      const newState = !state.userSidebarCollapsed;
      localStorage.setItem('userSidebarCollapsed', JSON.stringify(newState));
      return {userSidebarCollapsed: newState};
    }),

  toggleAdminSidebar: () =>
    set((state) => {
      const newState = !state.adminSidebarCollapsed;
      localStorage.setItem('adminSidebarCollapsed', JSON.stringify(newState));
      return {adminSidebarCollapsed: newState};
    }),

  toggleSuperAdminSidebar: () =>
    set((state) => {
      const newState = !state.superAdminSidebarCollapsed;
      localStorage.setItem('superAdminSidebarCollapsed', JSON.stringify(newState));
      return {superAdminSidebarCollapsed: newState};
    }),
}));
