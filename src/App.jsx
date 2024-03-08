import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

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

  const [currWinner, setCurrWinner] = useState("");
  const [currWinnerSymbol, setCurrWinnerSymbol] = useState("");
  const [history, setGameHistory] = useState([]);
  // const [user1WinnerHistory, setUser1WinnerHistory] = useState("Player 1");
  // const [user2WinnerHistory, setUser2WinnerHistory] = useState("Player 2");
  // const [drawWinnerHistory, setDrawWinnerHistory] = useState("Player 2");

  let userWinnerHistory;

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

  function checkWinner(square) {
    const winnerValue = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winnerValue.length; i++) {
      const [value1, value2, value3] = winnerValue[i];

      if (
        square[value1] &&
        square[value1] === square[value2] &&
        square[value1] === square[value3]
      ) {
        return square[value1];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare) {
    let copyOfSquare = [...square];
    if (checkWinner(copyOfSquare) || copyOfSquare[getCurrentSquare]) return;
    copyOfSquare[getCurrentSquare] = user1Turn ? user1Input : user2Input;
    setUser1Turn(!user1Turn);
    setSquare(copyOfSquare);
  }

  function handleRestart() {
    setUser1Turn(true);
    setSquare(Array(9).fill(""));
  }

  const winner = checkWinner(square);
  console.log(winner);

  // Shows all played games result history
  const newGameHistory = [...history, winner];
  console.log( 'new', newGameHistory);

  // function winnerHistory() {
  //   if (winner) {
  //     if (winner === user1Input) {
  //       userWinnerHistory = user1WinnerHistory;
  //     }
  //     if (winner === user2Input) {
  //       userWinnerHistory = user2WinnerHistory;
  //     }
  //   } else if (square.every((item) => item !== "")) {
  //     userWinnerHistory = drawWinnerHistory;
  //   }
  // }

  useEffect(() => {
    console.log("square:", square);
    console.log("user1Turn:", user1Turn);

    if (winner) {
      if (winner === user1Input) {
        setUser1Score(user1Score + 1);
        setStatus(`Winner is ${user1Name}. Please restart the game.`);
        setCurrWinner(`${user1Name}`);
        setCurrWinnerSymbol(`${user1Input}`);
        // setUser1WinnerHistory(`${user1WinnerHistory}`);
        setGameHistory(newGameHistory);
      }
      if (winner === user2Input) {
        setUser2Score(user2Score + 1);
        setStatus(`Winner is ${user2Name}. Please restart the game.`);
        setCurrWinner(`${user2Name}`);
        setCurrWinnerSymbol(`${user2Input}`);
        // setUser2WinnerHistory(`${user2WinnerHistory}`);
        setGameHistory(newGameHistory);
      }
    } else if (square.every((item) => item !== "")) {
      setStatus(`It's a Draw! Please restart the game.`);
      // setDrawWinnerHistory(`${drawWinnerHistory}`);
    } else {
      setStatus(`Next player is ${user1Turn ? user1Name : user2Name}`);
    }
  }, [square, user1Turn]);

  return (
    <>
      <div className="header">
        <h1>
          <a href="" className="title">
            Tic-Tac-Toe Game
          </a>
        </h1>
      </div>
      <div className="mainContainer">
        <div className="userInput">
          <div className="user1">
            <TextField
              id="outlined-helperText"
              label="Player 1 username"
              defaultValue="Default Value"
              value={user1Name}
              onChange={handleInputChangeName1}
            />
            <TextField
              id="outlined-helperText"
              label="Player 1 Symbol"
              defaultValue="Default Value"
              value={user1Input}
              onChange={handleInputChange1}
              sx={{ width: "40%", marginLeft: "10px" }}
            />
          </div>
          <div className="restart">
            <button className="button" onClick={handleRestart}>
              Restart
            </button>
          </div>
          <div className="user2">
            <TextField
              id="outlined-helperText"
              label="Player 2 username"
              defaultValue="Default Value"
              value={user2Name}
              onChange={handleInputChangeName2}
            />
            <TextField
              id="outlined-helperText"
              label="Player 2 Symbol"
              defaultValue="Default Value"
              value={user2Input}
              onChange={handleInputChange2}
              sx={{ width: "40%", marginLeft: "10px" }}
            />
          </div>
        </div>
        <div className="status">
          <p className="pst">{status}</p>
        </div>
        <div className="score">
          <p className="pstatus">
            {user1Name} score: {user1Score}
          </p>
          <p className="pstatus">
            {user2Name} score: {user2Score}
          </p>
        </div>
        <div className="container">
          <div className="row">
            <SquareButton value={square[0]} onClick={() => handleClick(0)} />
            <SquareButton value={square[1]} onClick={() => handleClick(1)} />
            <SquareButton value={square[2]} onClick={() => handleClick(2)} />
          </div>
          <div className="row">
            <SquareButton value={square[3]} onClick={() => handleClick(3)} />
            <SquareButton value={square[4]} onClick={() => handleClick(4)} />
            <SquareButton value={square[5]} onClick={() => handleClick(5)} />
          </div>
          <div className="row">
            <SquareButton value={square[6]} onClick={() => handleClick(6)} />
            <SquareButton value={square[7]} onClick={() => handleClick(7)} />
            <SquareButton value={square[8]} onClick={() => handleClick(8)} />
          </div>
        </div>
        <div className="gameHistory">
          <p>1</p>
          <p>{currWinner}</p>
          <p>{currWinnerSymbol}</p>
        </div>
        <div className="gameHistoryText">
          <h3>Game History</h3>
        </div>
        <div className="gameContainer">
          <div className="game">
            {history.map((historyItem, index) => (
              <div key={index} className="gameHistory">
                <p>{index + 1}</p>
                {/* <p>{user1WinnerHistory}</p>
                <p>{user1WinnerHistory}</p> */}
                <p>{currWinnerSymbol}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
