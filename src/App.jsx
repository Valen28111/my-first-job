import { useCallback, useEffect, useRef, useState } from "react";

import Button from "./components/Button";
import Board from "./components/Board";
import Box from "./components/Box";
import BoxBlue from "./components/BoxBlue";
import BoxGreen from "./components/BoxGreen";
import Grass from "./components/Grass";
import Player from "./components/Player";
import Target from "./components/Target";
import Floor from "./components/Floor";
import VirtualKeyboard from "./components/VirtualKeyboard";

import step from "./assets/step.wav";
import push from "./assets/push.wav";

import styles from "./App.module.css";

const levels = [
  // Nivel 1
  "gggggggggggggggggggbbbbbggggbpffbggggbfbxbbbggbfxfttbggbbbbbbbggggggggggggggggggg",
  // Nivel 2
  "ggggggggggbbbbbbbggbtffftbggbffxffbggbfxpxfbggbffxffbggbtffftbggbbbbbbbgggggggggg",
  // Nivel 3
  "bbbbbbbbbbtffffftbbfbfyfbfbbfffxfffbbffxpxffbbfffxfffbbfbfyfbfbbtffffftbbbbbbbbbb",
  // Agregar aquí los que se desee...
];

export default function App() {
  const [level, setLevel] = useState(0);
  const [direction, setDirection] = useState("right");
  const [items, setItems] = useState("");
  const [levelCompleted, setLevelCompleted] = useState(false);

  const stepRef = useRef(null);
  const pushRef = useRef(null);

  useEffect(() => {
    if (stepRef.current) stepRef.current.volume = 0.1;
    if (pushRef.current) pushRef.current.volume = 0.12;
  }, []);

  useEffect(function () {
    setItems(levels[level].replaceAll("t", "f").replaceAll("y", "x"));
    setDirection("right");
  }, [level]);

  useEffect(function () {
    function checkLevelIsCompleted() {
      if (items.length === 0) {
        return;
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i] === "x" && !["t", "y"].includes(levels[level][i])) {
          return;
        }
      }
      setLevelCompleted(true);
    }
    checkLevelIsCompleted();
  }, [level, items]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        setDirection("up");
        move(-9);
      }

      if (e.key === "ArrowDown") {
        setDirection("down");
        move(9);
      }

      if (e.key === "ArrowLeft") {
        setDirection("left");
        move(-1);
      }

      if (e.key === "ArrowRight") {
        setDirection("right");
        move(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return function () {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const move = useCallback(function (to) {
    setItems(prev => {
      const position = prev.indexOf("p");
      if (prev[position + to] === "f") {
        const arr = prev.split("").slice();
        [arr[position], arr[position + to]] = [arr[position + to], arr[position]];
        playStep();
        return arr.join("");
      } else if (prev[position + to] === "x" && prev[position + to + to] === "f") {
        const arr = prev.split("").slice();
        [arr[position + to], arr[position + to + to]] = [arr[position + to + to], arr[position + to]];
        [arr[position], arr[position + to]] = [arr[position + to], arr[position]];
        playPush();
        return arr.join("");
      } else {
        return prev;
      }
    });
  }, []);

  function playStep() {
    // Reinicia el sonido si ya estaba sonando
    stepRef.current.currentTime = 0;
    stepRef.current.play();
  }

  function playPush() {
    pushRef.current.currentTime = 0;
    pushRef.current.play();
  }

  function drawBoard() {
    return levels[level].split("").map((el, i) => {
      switch (el) {
        case "g":
          return <Grass key={`el-${i}`} />;
        case "b":
          return <Box key={`el-${i}`} />;
        default:
          return <Floor key={`el-${i}`} />;
      }
    })
  }

  function drawTargets() {
    return levels[level].split("").map((el, i) => {
      if (el === "t" || el === "y") {
        return <Target key={`target-${i}`} xy={calcPosition(i)} />;
      }
      return null;
    })
  }

  function drawBoxesAndPlayer() {
    return items.split("").map((el, i) => {
      if (el === "p") {
        return <Player key={`player-${i}`} xy={calcPosition(i)} direction={direction} />;
      }
      if (el === "x") {
        if (levels[level][i] === "t" || levels[level][i] === "y") {
          return <BoxGreen key={`bg-${i}`} xy={calcPosition(i)} />;
        } else {
          return <BoxBlue key={`bb-${i}`} xy={calcPosition(i)} />;
        }
      }
    })
  }

  function calcPosition(position) {
    const row = Math.floor(position / 9);
    const col = (position % 9);
    return { row, col };
  }

  function showNextButton() {
    if ((level + 1) < levels.length) {
      return (
        <Button
          onClick={() => {
            setLevelCompleted(false);
            setLevel(prev => prev + 1);
          }}
        >
          Siguiente Nivel
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          setLevelCompleted(false);
          setLevel(0);
        }}
      >
        Reiniciar Niveles
      </Button>
    );
  }

  return (
    <>
      <h2 className={styles.h2}>My First Job</h2>
      <Board>
        {drawBoard()}
        {drawTargets()}
        {drawBoxesAndPlayer()}
        {levelCompleted ? (
          <div className={styles.backdrop}>
            <h3 className={styles.h3}>Felicitaciones completaste el nivel {level + 1}!!!</h3>
            {showNextButton()}
          </div>
        ) : null}
      </Board >
      <VirtualKeyboard move={move} setDirection={setDirection} />

      <audio ref={stepRef} src={step} preload="auto" />
      <audio ref={pushRef} src={push} preload="auto" />
    </>
  );
}
