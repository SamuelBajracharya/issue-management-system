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
  isSidebarCollapsed: JSON.parse(localStorage.getItem('isSidebarCollapsed')) ?? false,
  setIsSidebarCollapsed: () =>
    set((state) => {
      const newMode = !state.isSidebarCollapsed;
      localStorage.setItem('isSidebarCollapsed', JSON.stringify(newMode));
      return {isSidebarCollapsed: newMode};
    })
}))