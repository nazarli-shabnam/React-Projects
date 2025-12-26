import Todo from "./components/Todo.jsx";
import Header from "./components/Header.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ThemeToggle />
      <Todo />
    </div>
  );
}

export default App;
