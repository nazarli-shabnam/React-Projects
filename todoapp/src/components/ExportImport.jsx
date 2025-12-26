import { useTodos } from "../hooks/useTodos";
import { useToast } from "../hooks/useToast";
import styles from "./exportimport.module.css";

export default function ExportImport({ onImport }) {
  const { todos } = useTodos();
  const { showToast } = useToast();

  function handleExport() {
    try {
      const dataStr = JSON.stringify(todos, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `todos-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Todos exported successfully!", "success");
    } catch (error) {
      showToast("Failed to export todos", "error");
      console.error("Export error:", error);
    }
  }

  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedTodos = JSON.parse(event.target.result);
          if (!Array.isArray(importedTodos)) {
            throw new Error("Invalid file format");
          }
          onImport(importedTodos);
          showToast(
            `Successfully imported ${importedTodos.length} todos!`,
            "success"
          );
        } catch (error) {
          showToast("Failed to import todos. Invalid file format.", "error");
          console.error("Import error:", error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleExport}
        disabled={todos.length === 0}
        title="Export todos to JSON file"
      >
        📥 Export
      </button>
      <button
        className={styles.button}
        onClick={handleImport}
        title="Import todos from JSON file"
      >
        📤 Import
      </button>
    </div>
  );
}
