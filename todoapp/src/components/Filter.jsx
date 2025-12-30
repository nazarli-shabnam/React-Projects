import styles from "./filter.module.css";

export default function Filter({ filter, setFilter }) {
  return (
    <div className={styles.filterContainer}>
      <button
        className={`${styles.filterButton} ${
          filter === "all" ? styles.active : ""
        }`}
        onClick={() => setFilter("all")}
        aria-label="Show all todos"
      >
        All
      </button>
      <button
        className={`${styles.filterButton} ${
          filter === "active" ? styles.active : ""
        }`}
        onClick={() => setFilter("active")}
        aria-label="Show active todos"
      >
        Active
      </button>
      <button
        className={`${styles.filterButton} ${
          filter === "completed" ? styles.active : ""
        }`}
        onClick={() => setFilter("completed")}
        aria-label="Show completed todos"
      >
        Completed
      </button>
    </div>
  );
}
