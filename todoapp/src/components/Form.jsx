import { useState, useRef, useEffect } from "react";
import styles from "./form.module.css";

export default function Form({ onAdd }) {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.trim()) {
      onAdd(todo);
      setTodo("");
      // Auto-focus input after adding
      inputRef.current?.focus();
    }
  }

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className={styles.tofoform} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          className={styles.modernInput}
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          type="text"
          placeholder="Enter a new todo"
          aria-label="New todo input"
        />
        <button
          className={styles.modernButton}
          type="submit"
          aria-label="Add todo"
        >
          Add
        </button>
      </div>
    </form>
  );
}
