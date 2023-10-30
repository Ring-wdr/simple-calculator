import { ChangeEvent, useState, useSyncExternalStore } from "react";
import { todosStore } from "./store";

export default function Local() {
  const [todo, setTodo] = useState("");
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );
  const addTodo = () => todosStore.addTodo(todo);
  const deleteTodo = (id: number) => () => todosStore.deleteTodo(id);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);
  return (
    <div>
      <button onClick={addTodo}>add</button>
      <input value={todo} onChange={onChange} />
      <ul>
        {todos.map(({ id, text }) => (
          <li key={id}>
            {text} <button onClick={deleteTodo(id)}>del this</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
