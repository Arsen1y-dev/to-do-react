import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { defaultItems, storageKey } from "./constants/todo";
import { createTask, toTaskList } from "./utils/tasks";

function normalizeStoredTasks(storedData) {
  if (!Array.isArray(storedData)) {
    return toTaskList(defaultItems);
  }

  return storedData.reduce((accumulator, item) => {
    if (typeof item === "string") {
      const text = item.trim();
      if (text) {
        accumulator.push(createTask(text));
      }
      return accumulator;
    }

    if (item && typeof item.text === "string") {
      const text = item.text.trim();
      if (text) {
        accumulator.push({
          id:
            typeof item.id === "string" && item.id
              ? item.id
              : createTask(text).id,
          text,
        });
      }
    }

    return accumulator;
  }, []);
}

function getInitialTasks() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return toTaskList(defaultItems);
    }

    const parsed = JSON.parse(raw);
    return normalizeStoredTasks(parsed);
  } catch {
    return toTaskList(defaultItems);
  }
}

export default function App() {
  const [tasks, setTasks] = useState(getInitialTasks);

  useEffect(() => {
    document.body.classList.add("body");

    return () => {
      document.body.classList.remove("body");
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(taskText) {
    const text = taskText.trim();
    if (!text) {
      return;
    }

    setTasks((previousTasks) => [createTask(text), ...previousTasks]);
  }

  function handleDeleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  }

  function handleDuplicateTask(taskId) {
    setTasks((previousTasks) => {
      const sourceTask = previousTasks.find((task) => task.id === taskId);
      if (!sourceTask) {
        return previousTasks;
      }

      return [createTask(sourceTask.text), ...previousTasks];
    });
  }

  function handleUpdateTask(taskId, taskText) {
    const text = taskText.trim();
    if (!text) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, text } : task
      )
    );
  }

  return (
    <>
      <main className="main">
        <section className="to-do">
          <h1 className="to-do__title">Список дел</h1>
          <TodoForm onAddTask={handleAddTask} />
          <TodoList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onDuplicateTask={handleDuplicateTask}
            onUpdateTask={handleUpdateTask}
          />
        </section>
      </main>
      <footer className="footer">© Yandex.Praktikum 2025</footer>
    </>
  );
}
