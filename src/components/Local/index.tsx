import {
  ChangeEvent,
  KeyboardEvent,
  useState,
  useSyncExternalStore,
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
import { todosStore } from "./store";

export default function Local() {
  const [currenttodo, setTodo] = useState("");
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot
  );
  const [checkedTodos, setCheckTodo] = useState<number[]>([]);
  const addTodo = () => currenttodo && todosStore.addTodo(currenttodo);
  const deleteTodo = (id: number) => () => todosStore.deleteTodo(id);
  const checkTodo = (id: number) => () =>
    setCheckTodo((prev) =>
      prev.indexOf(id) === -1
        ? [...prev.filter((todoId) => todoId !== id), id]
        : prev.filter((todoId) => todoId !== id)
    );
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    e.code === "Enter" &&
    !e.nativeEvent.isComposing &&
    (addTodo(), setTodo(""));

  return (
    <div>
      <TextField
        label="input todo"
        value={currenttodo}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Button variant="outlined" onClick={addTodo}>
        add
      </Button>
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
    </div>
  );
}
