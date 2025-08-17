import {create} from "zustand";

const useResponsiveStore = create((set) => {
  const checkIsMobile = () => window.innerWidth < 768;

  return {
    isMobile: checkIsMobile(),
    setIsMobile: (value) => set({isMobile: value}),
    initResizeListener: () => {
      const handleResize = () => set({isMobile: checkIsMobile()});
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
  };
});

export default useResponsiveStore;
