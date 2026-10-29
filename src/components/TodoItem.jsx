import { useEffect, useRef, useState } from "react";

export default function TodoItem({
  task,
  onDeleteTask,
  onDuplicateTask,
  onUpdateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditValue(task.text);
  }, [task.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function startEdit() {
    setEditValue(task.text);
    setIsEditing(true);
  }

  function cancelEdit() {
    setEditValue(task.text);
    setIsEditing(false);
  }

  function saveEdit() {
    const normalized = editValue.trim();
    if (!normalized) {
      cancelEdit();
      return;
    }

    onUpdateTask(task.id, normalized);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEdit();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      cancelEdit();
    }
  }

  return (
    <li className="to-do__item">
      {isEditing ? (
        <div className="to-do__item-edit-group">
          <input
            ref={inputRef}
            className="to-do__item-edit-input"
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="to-do__item-edit-action"
            type="button"
            onClick={saveEdit}
          >
            Сохранить
          </button>
          <button
            className="to-do__item-edit-action to-do__item-edit-action_type_cancel"
            type="button"
            onClick={cancelEdit}
          >
            Отмена
          </button>
        </div>
      ) : (
        <span className="to-do__item-text">{task.text}</span>
      )}

      <button
        className="to-do__item-button to-do__item-button_type_edit"
        type="button"
        aria-label="Редактировать"
        onClick={startEdit}
        disabled={isEditing}
      />
      <button
        className="to-do__item-button to-do__item-button_type_duplicate"
        type="button"
        aria-label="Копировать"
        onClick={() => onDuplicateTask(task.id)}
        disabled={isEditing}
      />
      <button
        className="to-do__item-button to-do__item-button_type_delete"
        type="button"
        aria-label="Удалить"
        onClick={() => onDeleteTask(task.id)}
        disabled={isEditing}
      />
    </li>
  );
}
