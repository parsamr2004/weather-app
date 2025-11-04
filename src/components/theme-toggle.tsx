import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-16 transition-colors border rounded-full shadow-inner h-9 bg-background/60 backdrop-blur"
    >
      <div
        className={`absolute h-7 w-7 rounded-full bg-white/70 backdrop-blur shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      />

      <div className="absolute flex items-center justify-center text-blue-500 transition-opacity duration-300 left-1 h-7 w-7">
        <Moon className={`h-4 w-4 ${isDark ? "opacity-0" : "opacity-100"}`} />
      </div>

      <div className="absolute flex items-center justify-center text-yellow-500 transition-opacity duration-300 right-1 h-7 w-7">
        <Sun className={`h-4 w-4 ${isDark ? "opacity-100" : "opacity-0"}`} />
      </div>
    </button>
  );
}

