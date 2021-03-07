import { useRef, useEffect } from "react";
import { warn } from "./utils/index";

export function useAvailableRange(range) {
  const availableRange = useRef("window");

  useEffect(() => {
    range = range || "window";
    if (range !== "window" && range !== "wrapper") {
      warn(
        `value of range [${range}] is invalid. please use "window" or "wrapper" instead`
      );
      range = "window";
    }
    availableRange.current = range;
    if (range === "window") {
      console.log(range);
      document.documentElement.style.cursor = "none";
    }

    return () => {
      if (range === "window") {
        document.documentElement.style.cursor = "";
      }
    };
  }, []);

  return availableRange.current;
}
