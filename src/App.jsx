import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./App.css";

function SquareButton({ value, onClick }) {
  return (
    <button onClick={onClick} className="squareButton">
      {value}
    </button>
  );
}

function App() {
  const [square, setSquare] = useState(Array(9).fill(""));
  const [user1Turn, setUser1Turn] = useState(true);
  const [status, setStatus] = useState("");
  const [user1Score, setUser1Score] = useState(0);
  const [user2Score, setUser2Score] = useState(0);
  const [user1Name, setUser1Name] = useState("Player 1");
  const [user2Name, setUser2Name] = useState("Player 2");
  const [user1Input, setUser1Input] = useState("X");
  const [user2Input, setUser2Input] = useState("O");

  const handleInputChangeName1 = (name1) => {
    setUser1Name(name1.target.value);
  };
  const handleInputChangeName2 = (name2) => {
    setUser2Name(name2.target.value);
  };

  const handleInputChange1 = (event1) => {
    setUser1Input(event1.target.value);
  };
  const handleInputChange2 = (event2) => {
    setUser2Input(event2.target.value);
  };

  return (
    <>
    </>
  );
}

export default App;
