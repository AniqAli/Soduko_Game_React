import "./App.css";
import { useState, useEffect } from "react";

const initial = [
  [2, -3, 4, 1, 5, 8, 3, -3, -6],
  [1, -4, 1, 1, 7, 8, 2, -9, -5],
  [3, -3, 2, 5, 9, -3, -1, 9, -5],
  [3, 3, -2, 4, 7, 8, -4, 5, 8],
  [2, 1, 2, -4, -7, 9, -2, 9, 1],
  [3, 3, 1, -5, -6, 3, 1, 6, 4],
  [3, 3, 1, -5, -6, 3, 1, 6, 4],
  [-5, -3, -1, 8, 6, 9, 2, -6, 3],
  [6, 2, 4, -9, -5, -1, -7, 5, 2],
];

function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState();

  const getFunc = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  };
  const [sodukoArr, setSodukoArr] = useState(getFunc(initial));

  const onInputChange = (e, row, col) => {
    var val = parseInt(e.target.value) || -1,
      difficulty = getFunc(sodukoArr);

    if (val === -1 || val >= 1 || val <= 9) {
      difficulty[row][col] = val;
    }
    setSodukoArr(difficulty);
  };

  // const getData = (name) => {
  //   fetch(
  //     `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${name}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log({ data });
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //       setError(error);
  //     });
  // };

  // useEffect(() => {
  //   getData(name);
  // }, []);

  // const handleClick = (e) => {
  //   console.log(e.target.value);
  // };

  const myFunction = (event) => {
    var x = event.target.id;
    switch (x) {
      case "easy":
        console.log("easy");
        setName(difficulty);
        getData(x);
        break;
      case "medium":
        console.log("medium");
        setName(difficulty);
        getData(x);
        break;
      case "hard":
        console.log("hard");
        setName(difficulty);
        getData(x);
        break;
      case "random":
        console.log("random");
        setName(difficulty);
        getData(x);
        break;
      case "clear":
        console.log("clear");
        setName(x);
        break;
      default:
        return false;
    }
  };

  const getData = (name) => {
    fetch(
      `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${name}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setDifficulty(data.difficulty);
      })
      .catch((error) => {
        console.log({ error });
        setError(error);
      });
  };

  useEffect(() => {
    getData(name);
  }, []);

  return (
    <div className="App">
      <h2>Soduko Game</h2>
      <table>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => {
          return (
            <tr
              key={rowIndex}
              className={(row + 1) % 3 === 0 ? "bottomBorder" : ""}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIndex) => {
                return (
                  <td
                    key={rowIndex + colIndex}
                    className={(col + 1) % 3 === 0 ? "rightBorder" : ""}
                  >
                    <input
                      className="inputField"
                      onChange={(e) => onInputChange(e, row, col)}
                      value={
                        sodukoArr[row][col] === -1 ? "" : sodukoArr[row][col]
                      }
                      disabled={initial[row][col] !== -1}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
        {
          // console.log({ name })
          console.log({ difficulty })
        }
      </table>
      <div className="generateContainer">
        <p>Generate:</p>
        <div className="btnsContainer">
          <button
            className="submitBtn"
            onClick={(e) => myFunction(e)}
            id="easy"
          >
            Easy
          </button>
          <button
            className="submitBtn"
            onClick={(e) => myFunction(e)}
            id="medium"
          >
            Medium
          </button>
          <button
            className="submitBtn"
            onClick={(e) => myFunction(e)}
            id="hard"
          >
            Hard
          </button>
          <button
            className="submitBtn"
            onClick={(e) => myFunction(e)}
            id="random"
          >
            Random
          </button>
          <button
            className="submitBtn"
            onClick={(e) => myFunction(e)}
            id="clear"
            style={{ border: "1px solid black" }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
