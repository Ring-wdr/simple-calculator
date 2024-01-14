import {
  useState,
  useSyncExternalStore,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TodoType, todosStore } from "./store";

export default function Local() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );
  const [checkedTodos, setCheckTodo] = useState<number[]>([]);
  const addTodo = (input: string) => () => {
    input && todosStore.addTodo(input);
  };
  const deleteTodo = (id: number) => () => todosStore.deleteTodo(id);
  const checkTodo = (id: number) => () =>
    setCheckTodo((prev) =>
      prev.indexOf(id) === -1
        ? [...prev.filter((todoId) => todoId !== id), id]
        : prev.filter((todoId) => todoId !== id)
    );

  return (
    <div>
      <InputForm getValue={addTodo} clearWhenDispatch allowKeyDown />
      <TodoList
        todos={todos}
        checkedTodos={checkedTodos}
        deleteTodo={deleteTodo}
        checkTodo={checkTodo}
      />
    </div>
  );
}

type InputFormProps = {
  getValue: (input: string) => () => void;
  allowKeyDown?: boolean;
  clearWhenDispatch?: boolean;
};

function InputForm({
  getValue,
  allowKeyDown,
  clearWhenDispatch = true,
}: InputFormProps) {
  const [value, setValue] = useState("");
  const onChange: ChangeEventHandler = (e) =>
    setValue((e.target as HTMLInputElement).value);
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (allowKeyDown && e.code === "Enter" && !e.nativeEvent.isComposing) {
      getValue(value)();
      if (clearWhenDispatch) {
        setValue("");
      }
    }
  };

  return (
    <>
      <TextField
        label="input todo"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Button variant="outlined" onClick={getValue(value)}>
        add
      </Button>
    </>
  );
}

type TodoListProps = {
  todos: TodoType[];
  checkedTodos: number[];
  deleteTodo: (id: number) => () => void;
  checkTodo: (id: number) => () => void;
};

function TodoList({
  todos,
  checkedTodos,
  deleteTodo,
  checkTodo,
}: TodoListProps) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.blue" }}>
      {todos.map(({ id, text }) => {
        const labelId = `checkbox-list-label-${id}`;
        return (
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={deleteTodo(id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={"listitem"} onClick={checkTodo(id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedTodos.indexOf(id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
