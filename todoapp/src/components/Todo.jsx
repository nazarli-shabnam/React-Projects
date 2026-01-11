import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import Footer from "./Footer";
import Search from "./Search";
import Filter from "./Filter";
import Sort from "./Sort";
import EmptyState from "./EmptyState";
import ExportImport from "./ExportImport";
import ToastContainer from "./ToastContainer";
import BulkActions from "./BulkActions";
import UndoRedo from "./UndoRedo";
import { useTodos } from "../hooks/useTodos";
import { useDebounce } from "../hooks/useDebounce";
import { useToast } from "../hooks/useToast";
import { useUndoRedo } from "../hooks/useUndoRedo";
import styles from "./todo.module.css";

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 };

export default function Todo() {
  const {
    todos: todosFromHook,
    addTodo: addTodoHook,
    toggleTodo: toggleTodoHook,
    deleteTodo: deleteTodoHook,
    updateTodo: updateTodoHook,
    clearCompleted: clearCompletedHook,
    importTodos: importTodosHook,
    setTodos: setTodosHook,
  } = useTodos();

  // Use undo/redo for todos
  const {
    state: todos,
    setState: setTodos,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo(todosFromHook);

  useEffect(() => {
    const todosStr = JSON.stringify(todosFromHook);
    const currentStr = JSON.stringify(todos);
    if (todosStr !== currentStr) {
      setTodos(todosFromHook);
    }
  }, [todosFromHook]);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [selectedIds, setSelectedIds] = useState([]);
  const { toasts, showToast, removeToast } = useToast();

  const addTodo = useCallback(
    (name, options) => {
      addTodoHook(name, options);
    },
    [addTodoHook]
  );

  const toggleTodo = useCallback(
    (id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
      setTodos(newTodos);
      setTodosHook(newTodos);
    },
    [todos, setTodos, setTodosHook]
  );

  const deleteTodo = useCallback(
    (id) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      setTodosHook(newTodos);
    },
    [todos, setTodos, setTodosHook]
  );

  const updateTodo = useCallback(
    (id, updates) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      setTodos(newTodos);
      setTodosHook(newTodos);
    },
    [todos, setTodos, setTodosHook]
  );

  const clearCompleted = useCallback(() => {
    const newTodos = todos.filter((todo) => !todo.done);
    setTodos(newTodos);
    setTodosHook(newTodos);
  }, [todos, setTodos, setTodosHook]);

  const importTodos = useCallback(
    (importedTodos) => {
      importTodosHook(importedTodos);
      // Will sync via useEffect
    },
    [importTodosHook]
  );

  const handleReorder = useCallback(
    (draggedIndex, targetIndex) => {
      const newTodos = [...todos];
      const [removed] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, removed);
      setTodos(newTodos);
      setTodosHook(newTodos);
      showToast("Todos reordered", "success");
    },
    [todos, setTodos, setTodosHook, showToast]
  );

  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;
  const activeTodos = todos.filter((todo) => !todo.done).length;

  // Filter, search, and sort todos
  const filteredTodos = useMemo(() => {
    let result = todos.filter((todo) => {
      const matchesSearch = todo.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.done) ||
        (filter === "completed" && todo.done);
      return matchesSearch && matchesFilter;
    });

    result = [...result].sort((a, b) => {
      if (a.done !== b.done) {
        return Number(a.done) - Number(b.done);
      }

      switch (sortBy) {
        case "priority":
          const priorityDiff =
            (PRIORITY_ORDER[b.priority] || 2) -
            (PRIORITY_ORDER[a.priority] || 2);
          if (priorityDiff !== 0) return priorityDiff;
          // If same priority, sort by due date, then creation date
          if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          if (a.dueDate) return -1;
          if (b.dueDate) return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "dueDate":
          if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          if (a.dueDate) return -1;
          if (b.dueDate) return 1;
          return 0;
        default:
          return 0;
      }
    });

    return result;
  }, [todos, debouncedSearchQuery, filter, sortBy]);

  const handleAddTodo = (name) => {
    addTodo(name);
    showToast("Todo added successfully!", "success");
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    showToast("Todo deleted", "info");
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    const newDoneState = !todo?.done;
    toggleTodo(id);
    showToast(
      newDoneState ? "Todo completed!" : "Todo marked as incomplete",
      "success"
    );
  };

  const handleClearCompleted = () => {
    const count = todos.filter((t) => t.done).length;
    clearCompleted();
    showToast(
      `Cleared ${count} completed todo${count !== 1 ? "s" : ""}`,
      "info"
    );
  };

  const handleImport = (importedTodos) => {
    importTodos(importedTodos);
  };

  const handleToggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(filteredTodos.map((t) => t.id));
  }, [filteredTodos]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    const newTodos = todos.filter((todo) => !selectedIds.includes(todo.id));
    setTodos(newTodos);
    setTodosHook(newTodos);
    showToast(`Deleted ${selectedIds.length} todo(s)`, "info");
    setSelectedIds([]);
  }, [selectedIds, todos, setTodos, setTodosHook, showToast]);

  const handleBulkComplete = useCallback(() => {
    if (selectedIds.length === 0) return;
    const newTodos = todos.map((todo) =>
      selectedIds.includes(todo.id) ? { ...todo, done: true } : todo
    );
    setTodos(newTodos);
    setTodosHook(newTodos);
    showToast(`Completed ${selectedIds.length} todo(s)`, "success");
    setSelectedIds([]);
  }, [selectedIds, todos, setTodos, setTodosHook, showToast]);

  const handleBulkUncomplete = useCallback(() => {
    if (selectedIds.length === 0) return;
    const newTodos = todos.map((todo) =>
      selectedIds.includes(todo.id) ? { ...todo, done: false } : todo
    );
    setTodos(newTodos);
    setTodosHook(newTodos);
    showToast(`Marked ${selectedIds.length} todo(s) as incomplete`, "success");
    setSelectedIds([]);
  }, [selectedIds, todos, setTodos, setTodosHook, showToast]);


  const isUndoRedoRef = useRef(false);
  
  useEffect(() => {
    const todosStr = JSON.stringify(todos);
    const hookStr = JSON.stringify(todosFromHook);
    if (todosStr !== hookStr && isUndoRedoRef.current) {
      // This means undo/redo changed the state, sync it back
      setTodosHook(todos);
      isUndoRedoRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  // Wrapped undo/redo functions that set the flag for sync
  const handleUndo = useCallback(() => {
    isUndoRedoRef.current = true;
    undo();
    showToast("Undone", "info");
  }, [undo, showToast]);

  const handleRedo = useCallback(() => {
    isUndoRedoRef.current = true;
    redo();
    showToast("Redone", "info");
  }, [redo, showToast]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) {
          handleUndo();
        }
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        if (canRedo) {
          handleRedo();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, handleUndo, handleRedo]);

  return (
    <div className={styles.todoContainer}>
      <UndoRedo
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      <Form onAdd={handleAddTodo} />
      {todos.length > 0 && (
        <>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className={styles.controls}>
            <Filter filter={filter} setFilter={setFilter} />
            <Sort sortBy={sortBy} setSortBy={setSortBy} />
            <ExportImport onImport={handleImport} />
          </div>
          <BulkActions
            selectedIds={selectedIds}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkDelete={handleBulkDelete}
            onBulkComplete={handleBulkComplete}
            onBulkUncomplete={handleBulkUncomplete}
            totalCount={filteredTodos.length}
          />
        </>
      )}
      {filteredTodos.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={updateTodo}
          onReorder={handleReorder}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
        />
      ) : (
        <EmptyState
          hasTodos={todos.length > 0}
          searchQuery={debouncedSearchQuery}
          filter={filter}
        />
      )}
      <Footer
        completedTodos={completedTodos}
        totalTodos={totalTodos}
        activeTodos={activeTodos}
        onClearCompleted={handleClearCompleted}
        hasCompletedTodos={completedTodos > 0}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
