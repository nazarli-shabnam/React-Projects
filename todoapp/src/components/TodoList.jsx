import { memo, useState } from "react";
import TodoItem from "./TodoItem";
import styles from "./todolist.module.css";

function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
  selectedIds,
  onToggleSelect,
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  function handleDragStart(e, id) {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", id);
  }

  function handleDragOver(e, id) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (id !== draggedId) {
      setDragOverId(id);
    }
  }

  function handleDragLeave() {
    setDragOverId(null);
  }

  function handleDrop(e, targetId) {
    e.preventDefault();
    if (draggedId && targetId && draggedId !== targetId) {
      const draggedIndex = todos.findIndex((t) => t.id === draggedId);
      const targetIndex = todos.findIndex((t) => t.id === targetId);
      onReorder(draggedIndex, targetIndex);
    }
    setDraggedId(null);
    setDragOverId(null);
  }

  function handleDragEnd() {
    setDraggedId(null);
    setDragOverId(null);
  }

  return (
    <div className={styles.list}>
      {todos.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, item.id)}
          onDragEnd={handleDragEnd}
          className={`${styles.draggableItem} ${
            draggedId === item.id ? styles.dragging : ""
          } ${dragOverId === item.id ? styles.dragOver : ""}`}
        >
          {onToggleSelect && (
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => onToggleSelect(item.id)}
              className={styles.selectCheckbox}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <TodoItem
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(TodoList);
