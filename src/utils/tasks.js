export function createTask(text) {
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    text,
  };
}

export function toTaskList(items) {
  return items.map((item) => createTask(item));
}
