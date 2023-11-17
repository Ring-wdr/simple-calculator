import { useState } from "react";
import { Grid, Button, Box, Modal, Typography } from "@mui/material";
import Calculator, { CalculatorProps } from "./components/calculator";
import Local from "./components/Local";
import Form from "./components/Form";
import "./App.css";
import MouseShow from "./components/MouseShow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.gray",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
} as const;

const buttonContents = [
  { name: "AC", value: "REFRESH", colspan: 2 },
  { name: "DEL", value: "DELETE" },
  { name: "÷", value: "/" },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "×", value: "*" },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "+", value: "+" },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "-", value: "-" },
  { name: ".", value: "." },
  { name: "0", value: 0 },
  { name: "=", value: "EXECUTE", colspan: 2 },
] satisfies CalculatorProps["buttonsData"];

const tabList = ["calculator", "store", "form", "mouse"] as const;
type TabState = (typeof tabList)[number];

function App() {
  const [err, setErr] = useState<Error | null>(null);
  const [tab, setTab] = useState<TabState>("calculator");
  const modalClose = () => setErr(null);

  return (
    <div className="content">
      <div>{tab.toUpperCase()}</div>
      {tabList.map((tab, idx) => (
        <input
          key={idx}
          type="radio"
          name="tab"
          value={tab}
          onChange={() => setTab(tab)}
        />
      ))}
      <div className="f-box">
        {tab === "calculator" ? (
          <Calculator buttonsData={buttonContents} dispatchError={setErr} />
        ) : tab === "store" ? (
          <Local />
        ) : tab === "form" ? (
          <Form />
        ) : (
          <MouseShow />
        )}
      </div>

      <Modal
        open={!!err}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            에러가 났다고 하네요~
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {err?.message}
          </Typography>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" onClick={modalClose}>
              확인
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
