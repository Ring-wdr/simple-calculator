declare global {
  type TodoType = {
    id: number;
    text: string;
  };
  let todos: TodoType[];
  type Listener = () => void;
  const listeners: Set<Listener>;
  const todosStore: {
    addTodo(text: string): void;
    deleteTodo(ids: number | number[]): void;
    subscribe(listener: Listener): () => boolean;
    getSnapshot(): TodoType[];
  };
  function emitChange(): void;
}

export {};
