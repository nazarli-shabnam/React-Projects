import { useState, useCallback, useEffect } from "react";

export function useStarRating({
  defaultRating = 0,
  maxRating = 5,
  minRating = 0,
  readOnly = false,
  controlled = false,
  rating: controlledRating,
  onChange,
  onHover,
} = {}) {
  const [internalRating, setInternalRating] = useState(defaultRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const rating = controlled ? controlledRating : internalRating;

  useEffect(() => {
    if (controlled && controlledRating !== undefined) {
      setInternalRating(controlledRating);
    }
  }, [controlled, controlledRating]);

  const handleRatingChange = useCallback(
    (newRating) => {
      if (readOnly) return;

      const clampedRating = Math.max(minRating, Math.min(maxRating, newRating));

      if (!controlled) {
        setInternalRating(clampedRating);
      }

      if (onChange) {
        onChange(clampedRating);
      }
    },
    [readOnly, minRating, maxRating, controlled, onChange]
  );

  const handleMouseEnter = useCallback(
    (starValue) => {
      if (readOnly) return;
      setHoveredRating(starValue);
      setIsHovering(true);
      if (onHover) {
        onHover(starValue);
      }
    },
    [readOnly, onHover]
  );

  const handleMouseLeave = useCallback(() => {
    if (readOnly) return;
    setHoveredRating(0);
    setIsHovering(false);
    if (onHover) {
      onHover(0);
    }
  }, [readOnly, onHover]);

  const clearRating = useCallback(() => {
    if (readOnly) return;
    handleRatingChange(0);
  }, [readOnly, handleRatingChange]);

  const getDisplayRating = useCallback(() => {
    return isHovering && hoveredRating > 0 ? hoveredRating : rating;
  }, [isHovering, hoveredRating, rating]);

  return {
    rating,
    hoveredRating,
    isHovering,
    displayRating: getDisplayRating(),
    handleRatingChange,
    handleMouseEnter,
    handleMouseLeave,
    clearRating,
  };
}
