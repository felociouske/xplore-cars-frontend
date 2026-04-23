import { useEffect } from "react";
import { useTheme } from "../components/ThemeContext";

const useMetaThemeColor = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const themeMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (themeMeta) {
      themeMeta.content = theme === "dark" ? "#1f2937" : "#ffffff";
    }
  }, [theme]);
};

export default useMetaThemeColor;
