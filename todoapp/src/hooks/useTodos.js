import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Migrate old todos to new format (with IDs and priority)
function migrateTodos(oldTodos) {
  if (!Array.isArray(oldTodos)) return [];

  return oldTodos.map((todo) => {
    // If already has ID, return as is (but ensure all fields exist)
    if (todo.id) {
      return {
        ...todo,
        priority: todo.priority || "medium",
        createdAt: todo.createdAt || new Date().toISOString(),
        description: todo.description || "",
        dueDate: todo.dueDate || null,
        category: todo.category || "",
        tags: todo.tags || [],
      };
    }
    // Migrate old format to new format
    return {
      id: crypto.randomUUID(),
      name: todo.name || (typeof todo === "string" ? todo : ""),
      done: todo.done || false,
      createdAt: todo.createdAt || new Date().toISOString(),
      priority: todo.priority || "medium",
      description: "",
      dueDate: null,
      category: "",
      tags: [],
    };
  });
}

export function useTodos() {
  const [todos, setTodos] = useLocalStorage("todos", [], migrateTodos);

  const addTodo = useCallback(
    (name, options = {}) => {
      if (!name.trim()) return;

      const newTodo = {
        id: crypto.randomUUID(),
        name: name.trim(),
        done: false,
        createdAt: new Date().toISOString(),
        priority: options.priority || "medium",
        description: options.description || "",
        dueDate: options.dueDate || null,
        category: options.category || "",
        tags: options.tags || [],
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    (id, updates) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  }, [setTodos]);

  const importTodos = useCallback(
    (importedTodos) => {
      // Migrate imported todos to ensure they have all required fields
      const migratedTodos = importedTodos.map((todo) => {
        if (todo.id && todo.priority) {
          return todo; // Already in correct format
        }
        return {
          id: todo.id || crypto.randomUUID(),
          name: todo.name || "",
          done: todo.done || false,
          createdAt: todo.createdAt || new Date().toISOString(),
          priority: todo.priority || "medium",
        };
      });
      setTodos(migratedTodos);
    },
    [setTodos]
  );

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    importTodos,
    setTodos,
  };
}
