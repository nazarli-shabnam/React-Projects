import { useState, useCallback, useRef } from "react";

export function useUndoRedo(initialState, maxHistory = 50) {
  const [state, setState] = useState(initialState);
  const historyRef = useRef([initialState]);
  const historyIndexRef = useRef(0);

  const setStateWithHistory = useCallback(
    (newState) => {
      const newHistory = historyRef.current.slice(
        0,
        historyIndexRef.current + 1
      );
      newHistory.push(newState);

      // Limit history size
      if (newHistory.length > maxHistory) {
        newHistory.shift();
      } else {
        historyIndexRef.current = newHistory.length - 1;
      }

      historyRef.current = newHistory;
      setState(newState);
    },
    [maxHistory]
  );

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1;
      setState(historyRef.current[historyIndexRef.current]);
      return true;
    }
    return false;
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1;
      setState(historyRef.current[historyIndexRef.current]);
      return true;
    }
    return false;
  }, []);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  return {
    state,
    setState: setStateWithHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
