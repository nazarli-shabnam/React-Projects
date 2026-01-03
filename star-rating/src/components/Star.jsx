import { memo, useCallback } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import styles from "./Star.module.css";

const Star = memo(function Star({
  index,
  value,
  displayRating,
  allowHalf,
  size,
  activeColor,
  inactiveColor,
  hoverColor,
  onRatingChange,
  onMouseEnter,
  onMouseLeave,
  readOnly,
  showTooltip,
  tooltipText,
  ariaLabel,
}) {
  const isActive = value <= displayRating;
  const isHalfActive =
    allowHalf && value - 0.5 <= displayRating && displayRating < value;

  const handleClick = useCallback(
    (e) => {
      if (readOnly) return;
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      if (allowHalf && clickX < width / 2) {
        onRatingChange(value - 0.5);
      } else {
        onRatingChange(value);
      }
    },
    [readOnly, allowHalf, value, onRatingChange]
  );

  const handleMouseEnter = useCallback(() => {
    if (readOnly) return;
    onMouseEnter(value);
  }, [readOnly, value, onMouseEnter]);

  const handleMouseMove = useCallback(
    (e) => {
      if (readOnly || !allowHalf) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      if (clickX < width / 2) {
        onMouseEnter(value - 0.5);
      } else {
        onMouseEnter(value);
      }
    },
    [readOnly, allowHalf, value, onMouseEnter]
  );

  const getColor = () => {
    if (isActive || isHalfActive) {
      return hoverColor || activeColor;
    }
    return inactiveColor;
  };

  const getStarSize = () => {
    if (typeof size === "string") {
      const sizeMap = { small: 20, medium: 40, large: 60 };
      return sizeMap[size] || 40;
    }
    return size || 40;
  };

  const starSize = getStarSize();

  return (
    <span
      className={`${styles.star} ${readOnly ? styles.readOnly : ""} ${
        isActive ? styles.active : ""
      } ${isHalfActive ? styles.halfActive : ""}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        color: getColor(),
        fontSize: `${starSize}px`,
        cursor: readOnly ? "default" : "pointer",
      }}
      role="radio"
      aria-checked={isActive || isHalfActive}
      aria-label={ariaLabel || `Rate ${value} star${value !== 1 ? "s" : ""}`}
      aria-valuenow={value}
      title={showTooltip ? tooltipText || `${value} star${value !== 1 ? "s" : ""}` : undefined}
      tabIndex={readOnly ? -1 : 0}
    >
      {isHalfActive && allowHalf ? (
        <span className={styles.halfStarContainer}>
          <FaStar className={styles.inactiveHalf} />
          <FaStarHalfAlt className={styles.activeHalf} />
        </span>
      ) : (
        <FaStar />
      )}
    </span>
  );
});

Star.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  displayRating: PropTypes.number.isRequired,
  allowHalf: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  hoverColor: PropTypes.string,
  onRatingChange: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  ariaLabel: PropTypes.string,
};

Star.displayName = "Star";

export default Star;

