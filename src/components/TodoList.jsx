import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  onDeleteTask,
  onDuplicateTask,
  onUpdateTask,
}) {
  return (
    <ul className="to-do__list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onDuplicateTask={onDuplicateTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
}
