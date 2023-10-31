type TodoType = {
  id: number;
  text: string;
  checked?: boolean;
};
type Listener = () => void;

let todos: TodoType[] = [];
const listeners = new Set<Listener>();

export const todosStore = {
  addTodo(text: string) {
    const localItems = getItemFromLocal();
    const nextId =
      localItems.reduce((next, curr) => (curr.id > next ? curr.id : next), 0) +
      1;
    todos = [...localItems, { id: nextId, text }];
    localStorage.setItem("simpleItem", JSON.stringify(todos));
    emitChange();
  },
  deleteTodo(ids: number | number[]) {
    const localItems = getItemFromLocal();
    todos = localItems.filter((localItem) =>
      Array.isArray(ids)
        ? !ids.some((id) => localItem.id === id)
        : localItem.id !== ids
    );
    localStorage.setItem("simpleItem", JSON.stringify(todos));
    emitChange();
  },
  subscribe(listener: Listener) {
    todos = getItemFromLocal();
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return todos;
  },
};
function getItemFromLocal() {
  const localState = localStorage.getItem("simpleItem");
  return localState !== null ? (JSON.parse(localState) as TodoType[]) : [];
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
