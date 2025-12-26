import styles from "./undoredo.module.css";

export default function UndoRedo({ canUndo, canRedo, onUndo, onRedo }) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        aria-label="Undo"
      >
        ↶ Undo
      </button>
      <button
        className={styles.button}
        onClick={onRedo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
        aria-label="Redo"
      >
        ↷ Redo
      </button>
    </div>
  );
}
