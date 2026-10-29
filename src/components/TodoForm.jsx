import { useState } from "react";

export default function TodoForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const normalized = taskText.trim();
    if (!normalized) {
      return;
    }

    onAddTask(normalized);
    setTaskText("");
  }

  return (
    <form className="to-do__form" onSubmit={handleSubmit}>
      <input
        className="to-do__input"
        name="task"
        placeholder="Следующее дело..."
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
      />
      <button className="to-do__submit" type="submit">
        Добавить
      </button>
    </form>
  );
}
