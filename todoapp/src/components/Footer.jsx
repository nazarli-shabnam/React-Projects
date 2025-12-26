import styles from "./footer.module.css";

export default function Footer({
  completedTodos,
  totalTodos,
  activeTodos,
  onClearCompleted,
  hasCompletedTodos,
}) {
  const completionPercentage =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className={styles.footer}>
      <div className={styles.stats}>
        <span className={styles.statItem}>
          <strong>{activeTodos}</strong> Active
        </span>
        <span className={styles.statItem}>
          <strong>{completedTodos}</strong> Completed
        </span>
        <span className={styles.statItem}>
          <strong>{totalTodos}</strong> Total
        </span>
        {totalTodos > 0 && (
          <span className={styles.statItem}>
            <strong>{completionPercentage}%</strong> Done
          </span>
        )}
      </div>
      {hasCompletedTodos && (
        <button
          className={styles.clearButton}
          onClick={onClearCompleted}
          aria-label="Clear completed todos"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}
