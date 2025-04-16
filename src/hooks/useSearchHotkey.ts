import { useEffect, useState } from "react";

type SearchHotkeyCallback = () => void;

/**
 * Custom hook to enable keyboard shortcut (Cmd+K or Ctrl+K) for global search
 */
export const useSearchHotkey = (callback: SearchHotkeyCallback): void => {
  // Track if the cmd/ctrl key is pressed
  const [isModifierPressed, setIsModifierPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for cmd/ctrl key press
      if (e.key === "Meta" || e.key === "Control") {
        setIsModifierPressed(true);
      }

      // Check for Cmd+K or Ctrl+K
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        callback();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Reset modifier key state when released
      if (e.key === "Meta" || e.key === "Control") {
        setIsModifierPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback]);
};
