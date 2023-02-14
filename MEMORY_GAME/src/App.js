import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Components/Card";
import fruitItems from "./Services/Fruits.json";

function App() {
  const [fruits, setFruits] = useState([]);
  const [fruitOne, setFruitOne] = useState(null);
  const [fruitTwo, setFruitTwo] = useState(null);

  const initGame = () => {
    const allFruits = [...fruitItems, ...fruitItems]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setFruits(allFruits);
  };

  const chooseCard = (fruit) => {
    fruitOne ? setFruitTwo(fruit) : setFruitOne(fruit);
  };

  const resetGame = () => {
    setFruits((prevFruits) => {
      return prevFruits.map((item) => {
        if (item.matched) {
          return { ...item, matched: false };
        }

        return item;
      });
    });

    setFruitOne(null);
    setFruitTwo(null);

    setTimeout(() => {
      initGame();
    }, 500);
  };

  useEffect(() => {
    if (fruitOne && fruitTwo) {
      if (fruitOne.src === fruitTwo.src) {
        setFruits((prevFruits) => {
          return prevFruits.map((item) => {
            if (item.src === fruitOne.src) {
              return { ...item, matched: true };
            } else {
              return item;
            }
          });
        });
      }

      setTimeout(() => {
        setFruitOne(null);
        setFruitTwo(null);
      }, 500);
    }
  }, [fruitTwo, fruitOne]);
  return (
    <>
      <h1>Memory Game</h1>
      {fruits.length ? (
        <>
          <button className="reset" onClick={resetGame}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-reload"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
              <path d="M20 4v5h-5"></path>
            </svg>
          </button>
          <div className="game-block">
            {fruits.map((fruit, key) => {
              return (
                <Card
                  key={key}
                  fruit={fruit}
                  chooseCard={chooseCard}
                  flipped={
                    fruit === fruitOne || fruit === fruitTwo || fruit.matched
                  }
                />
              );
            })}
          </div>
        </>
      ) : (
        <button onClick={initGame} className="start-game">
          Start Game
        </button>
      )}
    </>
  );
}

export default App;
