import styles from "./search.module.css";

export default function Search({ searchQuery, setSearchQuery }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search todos"
      />
    </div>
  );
}
