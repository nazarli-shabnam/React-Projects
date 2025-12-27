import styles from "./emptystate.module.css";

export default function EmptyState({ hasTodos, searchQuery, filter }) {
  if (!hasTodos) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <h2 className={styles.emptyTitle}>No todos yet!</h2>
        <p className={styles.emptyMessage}>
          Add your first todo to get started.
        </p>
      </div>
    );
  }

  if (searchQuery) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <h2 className={styles.emptyTitle}>No todos found</h2>
        <p className={styles.emptyMessage}>
          No todos match your search "{searchQuery}".
        </p>
      </div>
    );
  }

  if (filter === "active") {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>✅</div>
        <h2 className={styles.emptyTitle}>All done!</h2>
        <p className={styles.emptyMessage}>
          You've completed all your active todos.
        </p>
      </div>
    );
  }

  if (filter === "completed") {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h2 className={styles.emptyTitle}>No completed todos</h2>
        <p className={styles.emptyMessage}>
          You haven't completed any todos yet.
        </p>
      </div>
    );
  }

  return null;
}
