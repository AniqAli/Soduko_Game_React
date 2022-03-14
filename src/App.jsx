import { useEffect, useState } from "react";
import "./App.css";

const difficultyArray = ["Easy", "Medium", "Hard"];

function App() {
  const [gameState, setGameState] = useState({
    boxes: [],
  });
  const [diff, setDiff] = useState("easy");

  useEffect(() => {
    async function fetchGameBoard() {
      const res = await fetch(
        `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${diff}`
      );

      const blockNames = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

      const body = await res.json();

      const array = [];
      const puzzle = body.puzzle;

      const keys = Object.keys(puzzle);

      for (let i = 0; i < 9; i++) {
        const blockKeys = keys.filter((key) => key.includes(blockNames[i]));

        const block = Array(9).fill(0);
        blockKeys.forEach((blockKey) => {
          const splittedKey = blockKey.split("");
          block[+splittedKey[1] - 1] = +puzzle[blockKey];
        });
        array.push(block);
      }

      setGameState({
        boxes: array,
      });
    }

    fetchGameBoard();
  }, [diff]);

  function onChangeHandler(value, childIdx, parentIdx) {
    const temp = [...gameState.boxes];

    temp[parentIdx][childIdx] = value;

    setGameState({ boxes: temp });
  }

  // To run this, i will need a solve api
  // async function solve() {
  //   const res = await fetch({ method: "POST", url: "", body: gameState.boxes });
  //   const body = await res.json();

  //   if (body.solved) {
  //     console.log("CBM", "solved");
  //   } else {
  //     console.log("CBM", "Wrong solution");
  //   }
  // }

  function changeDiff(diff) {
    console.log("CBM", { diff });
    setDiff(diff.toLowerCase());
  }

  return (
    gameState.boxes.length !== 0 && (
      <>
        <div
          style={{
            display: "flex",
            width: "450px",
            height: "450px",
            flexWrap: "wrap",
            border: ".1rem solid #333",
          }}
        >
          {gameState.boxes.map((box, parentIdx) => (
            <Box
              key={`${parentIdx}`}
              box={box}
              parentIdx={parentIdx}
              onChangeHandler={onChangeHandler}
            />
          ))}
        </div>
        <div className="generateContainer">
          <p>Generate:</p>
          <div className="btnsContainer">
            {difficultyArray.map((diff) => (
              <button className="submitBtn" onClick={() => changeDiff(diff)}>
                {diff}
              </button>
            ))}
            <button
              className="submitBtn"
              onClick={() =>
                changeDiff(difficultyArray[Math.floor(Math.random() * 3)])
              }
            >
              Random
            </button>
          </div>
        </div>
      </>
    )
  );
}

function Box({ box, parentIdx, onChangeHandler }) {
  return (
    <div
      style={{
        width: "calc(150px - .2rem)",
        height: "calc(150px - .2rem)",
        display: "flex",
        flexWrap: "wrap",
        border: ".1rem solid #eee",
      }}
    >
      {box.map((cell, childIdx) => (
        <Cell
          key={`${childIdx}-${parentIdx}`}
          cell={cell}
          childIdx={childIdx}
          parentIdx={parentIdx}
          onChangeHandler={onChangeHandler}
        />
      ))}
    </div>
  );
}

function Cell({ cell, childIdx, parentIdx, onChangeHandler }) {
  return (
    <div style={{ width: "calc(50px - .2rem)", height: "calc(50px - .2rem)" }}>
      <input
        style={{
          all: "unset",
          width: "100%",
          height: "100%",
          border: ".1rem solid #333",
          textAlign: "center",
          fontWeight: "800",
        }}
        disabled={cell === 0 ? false : true}
        value={cell === 0 ? "" : cell}
        onChange={(e) => onChangeHandler(e.target.value, childIdx, parentIdx)}
        type="number"
      />
    </div>
  );
}

export default App;
