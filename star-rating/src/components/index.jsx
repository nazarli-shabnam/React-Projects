import { useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import { useStarRating } from "../hooks/useStarRating";
import styles from "./StarRating.module.css";

export default function StarRating({
  rating: controlledRating,
  defaultRating = 0,
  maxRating = 5,
  minRating = 0,
  allowHalf = false,
  readOnly = false,
  size = "medium",
  activeColor = "#fff700",
  inactiveColor = "#cccccc",
  hoverColor,
  showTooltip = true,
  showLabels = false,
  showRatingText = false,
  showClearButton = false,
  labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"],
  onChange,
  onHover,
  className,
  style,
  ariaLabel = "Star rating",
  id,
  name,
  value,
}) {
  const containerRef = useRef(null);
  const isControlled = controlledRating !== undefined;

  const {
    rating,
    displayRating,
    handleRatingChange,
    handleMouseEnter,
    handleMouseLeave,
    clearRating,
  } = useStarRating({
    defaultRating,
    maxRating,
    minRating,
    readOnly,
    controlled: isControlled,
    rating: controlledRating,
    onChange,
    onHover,
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (readOnly) return;

      let newRating = rating;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newRating = Math.min(maxRating, rating + (allowHalf ? 0.5 : 1));
          handleRatingChange(newRating);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newRating = Math.max(minRating, rating - (allowHalf ? 0.5 : 1));
          handleRatingChange(newRating);
          break;
        case "Home":
          e.preventDefault();
          handleRatingChange(minRating);
          break;
        case "End":
          e.preventDefault();
          handleRatingChange(maxRating);
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          if (rating === 0) {
            handleRatingChange(1);
          }
          break;
        case "Escape":
          e.preventDefault();
          clearRating();
          break;
        default:
          return;
      }
    },
    [readOnly, rating, maxRating, minRating, allowHalf, handleRatingChange, clearRating]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container && !readOnly) {
      container.addEventListener("keydown", handleKeyDown);
      return () => {
        container.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleKeyDown, readOnly]);

  const getRatingText = useCallback(() => {
    if (rating === 0) return "No rating";
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    if (hasHalf) {
      return `${fullStars}.5 out of ${maxRating} stars`;
    }
    return `${fullStars} out of ${maxRating} stars`;
  }, [rating, maxRating]);

  const getLabelText = useCallback(() => {
    if (!showLabels || rating === 0) return null;
    const index = Math.ceil(rating) - 1;
    return labels[index] || "";
  }, [showLabels, rating, labels]);

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(i);
  }

  const effectiveHoverColor = hoverColor || activeColor;

  return (
    <div
      ref={containerRef}
      className={`${styles.starRating} ${className || ""}`}
      style={style}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-valuenow={rating}
      aria-valuemin={minRating}
      aria-valuemax={maxRating}
      id={id}
      tabIndex={readOnly ? -1 : 0}
    >
      <div className={styles.starsContainer}>
        {stars.map((starValue) => (
          <Star
            key={starValue}
            index={starValue}
            value={starValue}
            displayRating={displayRating}
            allowHalf={allowHalf}
            size={size}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            hoverColor={effectiveHoverColor}
            onRatingChange={handleRatingChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            readOnly={readOnly}
            showTooltip={showTooltip}
            ariaLabel={`${starValue} star${starValue !== 1 ? "s" : ""}`}
          />
        ))}
      </div>

      {(showRatingText || showLabels || showClearButton) && (
        <div className={styles.ratingInfo}>
          {showRatingText && (
            <span className={styles.ratingText} aria-live="polite">
              {getRatingText()}
            </span>
          )}
          {showLabels && getLabelText() && (
            <span className={styles.labelText}>{getLabelText()}</span>
          )}
          {showClearButton && !readOnly && rating > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearRating}
              aria-label="Clear rating"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={value !== undefined ? value : rating}
        />
      )}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  defaultRating: PropTypes.number,
  maxRating: PropTypes.number,
  minRating: PropTypes.number,
  allowHalf: PropTypes.bool,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["small", "medium", "large"]),
    PropTypes.number,
  ]),
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  hoverColor: PropTypes.string,
  showTooltip: PropTypes.bool,
  showLabels: PropTypes.bool,
  showRatingText: PropTypes.bool,
  showClearButton: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onHover: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
