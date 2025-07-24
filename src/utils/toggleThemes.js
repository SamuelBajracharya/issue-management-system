import {useDarkToggleStore} from "../store/uiStore.js";
import {useEffect} from "react";

export const ToggleThemes = () => {

  const isDarkMode = useDarkToggleStore((state) => state.isDarkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? 'theme-dark' : 'theme-light';
  }, [isDarkMode]);
}
