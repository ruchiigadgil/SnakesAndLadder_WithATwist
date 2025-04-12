import React, { useState, useEffect } from "react";
import PlayerToken from "./PlayerToken";
import { ladders, snakes } from "../utils/jumps";
import "../styles/GameComponent.css";

const questionsData = [
  {
    q: "Which part of the Constitution deals with Fundamental Rights?",
    options: ["Part I", "Part III", "Part V", "Part IX"],
    answer: "Part III",
  },
  {
    q: "Who is known as the father of the Indian Constitution?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "B.R. Ambedkar",
      "Sardar Patel",
    ],
    answer: "B.R. Ambedkar",
  },
  {
    q: "How many schedules are there in the Constitution of India?",
    options: ["10", "12", "8", "9"],
    answer: "12",
  },
];

const GameComponent = ({ boardImage }) => {
  const initialPlayers = [
    { name: "You", position: 1 },
    { name: "Computer", position: 1 },
  ];

  const [players, setPlayers] = useState(initialPlayers);
  const [turn, setTurn] = useState(0);
  const [dice, setDice] = useState(null);
  const [message, setMessage] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [pendingMove, setPendingMove] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const getRandomQuestion = () => {
    return questionsData[Math.floor(Math.random() * questionsData.length)];
  };

  useEffect(() => {
    console.log("Player positions updated:", players);
  }, [players]);

  const rollDice = () => {
    if (gameOver || turn !== 0) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);
    setMessage(`You rolled a ${roll}`);

    setTimeout(() => movePlayer(roll, 0), 700);
  };

  const movePlayer = (roll, playerIndex) => {
    const currentPlayer = players[playerIndex];
    let newPosition = Math.min(currentPlayer.position + roll, 100);

    if (playerIndex === 0) {
      if (ladders[newPosition]) {
        const q = getRandomQuestion();
        setPendingMove({
          newPosition,
          jump: ladders[newPosition],
          type: "ladder",
          q,
          playerIndex,
        });
        setMessage("You found a ladder! Answer to climb!");
        setShowQuestion(true);
        return;
      } else if (snakes[newPosition]) {
        const q = getRandomQuestion();
        setPendingMove({
          newPosition,
          jump: snakes[newPosition],
          type: "snake",
          q,
          playerIndex,
        });
        setMessage("Snake! Answer correctly to avoid!");
        setShowQuestion(true);
        return;
      }
    } else if (playerIndex === 1) {
      if (ladders[newPosition]) {
        setMessage(
          `Computer climbed a ladder from ${newPosition} to ${ladders[newPosition]}!`
        );
        newPosition = ladders[newPosition];
      } else if (snakes[newPosition]) {
        setMessage(
          `Computer got bitten by a snake from ${newPosition} to ${snakes[newPosition]}!`
        );
        newPosition = snakes[newPosition];
      }
    }

    updatePosition(newPosition, playerIndex);
  };

  const updatePosition = (pos, playerIndex) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === playerIndex ? { ...p, position: pos } : p))
    );

    if (pos === 100) {
      setMessage(`${players[playerIndex].name} wins! 🎉`);
      setGameOver(true);
      return;
    }

    const nextTurn = 1 - playerIndex;
    setTurn(nextTurn);
    setDice(null);

    if (nextTurn === 1 && !gameOver) {
      setTimeout(() => {
        const compRoll = Math.floor(Math.random() * 6) + 1;
        setDice(compRoll);
        setMessage(`Computer rolled a ${compRoll}`);

        setTimeout(() => movePlayer(compRoll, 1), 1000);
      }, 1500);
    }
  };

  const handleAnswer = (option) => {
    if (!pendingMove) return;

    const correct = option === pendingMove.q.answer;
    let finalPosition;

    if (pendingMove.type === "ladder") {
      finalPosition = correct ? pendingMove.jump : pendingMove.newPosition;
      setMessage(
        correct
          ? "Correct! 🪜 Climbed to position " + pendingMove.jump
          : "Wrong answer! Stayed at position " + pendingMove.newPosition
      );
    } else if (pendingMove.type === "snake") {
      finalPosition = correct ? pendingMove.newPosition : pendingMove.jump;
      setMessage(
        correct
          ? "Correct! 🛡️ Avoided the snake!"
          : "Wrong! 🐍 Slid down to position " + pendingMove.jump
      );
    }

    setShowQuestion(false);
    setTimeout(() => {
      updatePosition(finalPosition, pendingMove.playerIndex);
    }, 1000);
  };

  const resetGame = () => {
    setPlayers(initialPlayers);
    setTurn(0);
    setDice(null);
    setMessage("");
    setShowQuestion(false);
    setPendingMove(null);
    setGameOver(false);
  };

  return (
    <div className="app">
      <div className="board-container">
        <img src={boardImage} alt="Board" className="board-img" />
        {players.map((p, i) => (
          <PlayerToken key={i} player={p} index={i} />
        ))}
      </div>

      <div className="game-info">
        {message && <h3>{message}</h3>}
        {dice && <div className="dice">Dice: {dice}</div>}
        {!gameOver && turn === 0 && !showQuestion && (
          <button onClick={rollDice}>🎲 Roll Dice</button>
        )}
        {gameOver && <button onClick={resetGame}>🔄 Play Again</button>}
      </div>

      {showQuestion && pendingMove && (
        <div className="question-modal">
          <div className="question-box">
            <h3>{pendingMove.q.q}</h3>
            {pendingMove.q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
