import { useState } from "react";
import styles from "./bulkactions.module.css";

export default function BulkActions({
  selectedIds,
  onSelectAll,
  onDeselectAll,
  onBulkDelete,
  onBulkComplete,
  onBulkUncomplete,
  totalCount,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const selectedCount = selectedIds.length;
  const allSelected = selectedCount === totalCount && totalCount > 0;

  if (selectedCount === 0) {
    return (
      <div className={styles.container}>
        <button
          className={styles.selectButton}
          onClick={allSelected ? onDeselectAll : onSelectAll}
          disabled={totalCount === 0}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectedInfo}>
        <strong>{selectedCount}</strong> selected
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={onBulkComplete}
          title="Mark selected as complete"
        >
          ✓ Complete
        </button>
        <button
          className={styles.actionButton}
          onClick={onBulkUncomplete}
          title="Mark selected as incomplete"
        >
          ↻ Incomplete
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={onBulkDelete}
          title="Delete selected"
        >
          🗑️ Delete
        </button>
        <button
          className={styles.actionButton}
          onClick={onDeselectAll}
          title="Deselect all"
        >
          ✕ Clear
        </button>
      </div>
    </div>
  );
}
