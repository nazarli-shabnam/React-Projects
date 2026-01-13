import { useState, useEffect } from "react";
import styles from "./tododetails.module.css";

export default function TodoDetails({ todo, onUpdate, onClose }) {
  const [description, setDescription] = useState(todo.description || "");
  const [dueDate, setDueDate] = useState(todo.dueDate || "");
  const [category, setCategory] = useState(todo.category || "");
  const [tags, setTags] = useState(todo.tags?.join(", ") || "");

  // Sync state when todo prop changes
  useEffect(() => {
    setDescription(todo.description || "");
    setDueDate(todo.dueDate || "");
    setCategory(todo.category || "");
    setTags(todo.tags?.join(", ") || "");
  }, [todo]);

  function handleSave() {
    onUpdate(todo.id, {
      description: description.trim(),
      dueDate: dueDate || null,
      category: category.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    });
    onClose();
  }

  const isOverdue = dueDate && new Date(dueDate) < new Date() && !todo.done;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Todo Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description or notes..."
              rows={4}
              className={styles.textarea}
            />
          </div>

          <div className={styles.field}>
            <label>
              Due Date{" "}
              {isOverdue && <span className={styles.overdue}>⚠️ Overdue</span>}
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.dateInput}
            />
            {dueDate && (
              <button
                type="button"
                onClick={() => setDueDate("")}
                className={styles.clearDate}
              >
                Clear
              </button>
            )}
          </div>

          <div className={styles.field}>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Work, Personal, Shopping"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., urgent, important, project"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
