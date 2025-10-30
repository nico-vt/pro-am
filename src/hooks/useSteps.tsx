import { useState, useCallback } from "react";

type UseStepsConfig<T extends string | number> = {
  steps: readonly T[];
  initialStep?: T;
};

export function useSteps<T extends string | number>({
  steps,
  initialStep,
}: UseStepsConfig<T>) {
  if (!steps || steps.length === 0) {
    throw new Error("useSteps requires at least one step");
  }

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialStep) {
      const idx = steps.indexOf(initialStep);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const step = steps[currentIndex];
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === steps.length - 1;

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps]);

  const back = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (step: T) => {
      const idx = steps.indexOf(step);
      if (idx !== -1) setCurrentIndex(idx);
    },
    [steps]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return {
    step,
    index: currentIndex,
    isFirstStep,
    isLastStep,
    next,
    back,
    goTo,
    reset,
    steps,
  };
}
