import styles from "./sort.module.css";

export default function Sort({ sortBy, setSortBy }) {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort-select" className={styles.sortLabel}>
        Sort by:
      </label>
      <select
        id="sort-select"
        className={styles.sortSelect}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        aria-label="Sort todos"
      >
        <option value="priority">Priority</option>
        <option value="name">Name</option>
        <option value="date">Date Created</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
