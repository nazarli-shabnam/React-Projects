import { useState, useRef, useEffect } from "react";
import TodoDetails from "./TodoDetails";
import styles from "./todoitem.module.css";

const PRIORITY_COLORS = {
  high: "#ff4444",
  medium: "#f7ca18",
  low: "#4caf50",
};

const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const inputRef = useRef(null);
  const priorityRef = useRef(null);

  // Sync editValue when item.name changes (if not currently editing)
  useEffect(() => {
    if (!isEditing) {
      setEditValue(item.name || "");
    }
  }, [item.name, isEditing]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (priorityRef.current && !priorityRef.current.contains(event.target)) {
        setShowPriorityMenu(false);
      }
    }

    if (showPriorityMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPriorityMenu]);

  function handleDoubleClick() {
    setIsEditing(true);
    setEditValue(item.name);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    if (editValue.trim()) {
      onUpdate(item.id, { name: editValue.trim() });
      setIsEditing(false);
    } else {
      // If empty, delete the todo
      onDelete(item.id);
    }
  }

  function handleEditCancel() {
    setIsEditing(false);
    setEditValue(item.name);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleEditSubmit(e);
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    const todoName = item.name || "this todo";
    if (window.confirm(`Are you sure you want to delete "${todoName}"?`)) {
      onDelete(item.id);
    }
  }

  function handlePriorityChange(newPriority) {
    onUpdate(item.id, { priority: newPriority });
    setShowPriorityMenu(false);
  }

  const priority = item.priority || "medium";
  const priorityColor = PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: "Overdue", className: styles.overdue };
    if (diffDays === 0) return { text: "Today", className: styles.today };
    if (diffDays === 1) return { text: "Tomorrow", className: styles.tomorrow };
    if (diffDays <= 7)
      return { text: `In ${diffDays} days`, className: styles.upcoming };
    return { text: date.toLocaleDateString(), className: styles.future };
  };

  const dueDateInfo = item.dueDate ? formatDate(item.dueDate) : null;
  const hasDetails =
    item.description || item.dueDate || item.category || item.tags?.length > 0;

  return (
    <>
      <div
        className={`${styles.item} ${item.done ? styles.completedItem : ""} ${
          item.dueDate && !item.done && new Date(item.dueDate) < new Date()
            ? styles.overdueItem
            : ""
        }`}
      >
        <div className={styles.itemName}>
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className={styles.editForm}>
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleEditSubmit}
                onKeyDown={handleKeyDown}
                className={styles.editInput}
                aria-label="Edit todo"
              />
            </form>
          ) : (
            <>
              <input
                type="checkbox"
                checked={item.done || false}
                onChange={() => onToggle(item.id)}
                className={styles.checkbox}
                aria-label={`Toggle ${item.name || "todo"}`}
              />
              <div
                className={styles.priorityBadge}
                style={{ backgroundColor: priorityColor }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriorityMenu(!showPriorityMenu);
                }}
                title={`Priority: ${PRIORITY_LABELS[priority]}`}
                ref={priorityRef}
              >
                {PRIORITY_LABELS[priority][0]}
                {showPriorityMenu && (
                  <div className={styles.priorityMenu}>
                    {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        className={`${styles.priorityOption} ${
                          priority === key ? styles.active : ""
                        }`}
                        onClick={() => handlePriorityChange(key)}
                        style={{ borderLeftColor: PRIORITY_COLORS[key] }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.todoContent}>
                <span
                  className={`${styles.todoText} ${
                    item.done ? styles.completed : ""
                  }`}
                  onDoubleClick={handleDoubleClick}
                  title="Double-click to edit"
                >
                  {item.name || "Untitled Todo"}
                </span>
                <div className={styles.meta}>
                  {item.category && (
                    <span className={styles.category}>{item.category}</span>
                  )}
                  {item.tags?.length > 0 && (
                    <div className={styles.tags}>
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className={styles.tagMore}>
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {dueDateInfo && (
                    <span
                      className={`${styles.dueDate} ${dueDateInfo.className}`}
                    >
                      📅 {dueDateInfo.text}
                    </span>
                  )}
                  {item.description && (
                    <span
                      className={styles.hasDescription}
                      title={item.description}
                    >
                      📝
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.actions}>
                {hasDetails && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className={styles.detailsButton}
                    aria-label="View details"
                    title="View/Edit details"
                  >
                    ⚙️
                  </button>
                )}
                <button
                  onClick={handleDeleteClick}
                  className={styles.deleteButton}
                  aria-label={`Delete ${item.name || "todo"}`}
                  title="Delete todo"
                >
                  ×
                </button>
              </div>
            </>
          )}
        </div>
        <hr className={styles.line} />
      </div>
      {showDetails && (
        <TodoDetails
          todo={item}
          onUpdate={onUpdate}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
