// usePerformanceGuard.js
import { useEffect, useRef } from "react";
import { Alert } from "react-native";

let globalTimers = new Set(); // Track active timers

// Patch setTimeout & setInterval to monitor them
const patchTimers = () => {
  if (!global.originalSetTimeout) {
    global.originalSetTimeout = global.setTimeout;
    global.originalSetInterval = global.setInterval;
    global.originalClearTimeout = global.clearTimeout;
    global.originalClearInterval = global.clearInterval;

    global.setTimeout = (fn, t, ...args) => {
      const id = global.originalSetTimeout(fn, t, ...args);
      globalTimers.add(id);
      return id;
    };

    global.setInterval = (fn, t, ...args) => {
      const id = global.originalSetInterval(fn, t, ...args);
      globalTimers.add(id);
      return id;
    };

    global.clearTimeout = (id) => {
      globalTimers.delete(id);
      return global.originalClearTimeout(id);
    };

    global.clearInterval = (id) => {
      globalTimers.delete(id);
      return global.originalClearInterval(id);
    };
  }
};

patchTimers();

export function usePerformanceGuard(screenName = "Unknown") {
  const renderCount = useRef(0);

  renderCount.current++;

  useEffect(() => {
    // Warn if too many re-renders
    if (renderCount.current > 30) {
      console.warn(
        `⚠️ High re-renders detected in ${screenName}: ${renderCount.current}`
      );
      Alert.alert(
        "Performance Warning",
        `${screenName} is re-rendering too much (${renderCount.current} times).`
      );
    }
  }, [renderCount.current]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Warn if too many active timers
      if (globalTimers.size > 10) {
        console.warn(
          `⚠️ Too many active timers in ${screenName}: ${globalTimers.size}`
        );
        Alert.alert(
          "Performance Warning",
          `${screenName} has ${globalTimers.size} active timers (possible leak).`
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);
}
