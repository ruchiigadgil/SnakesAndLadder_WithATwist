import React from "react";
import { getCoordinatesForPosition } from "../utils/positionMap";
import PlayerToken from "./PlayerToken";
import "../styles/Board.css";
import boardImage from "../assets/board.png";

const Board = ({ players }) => {
  return (
    <div className="board-container">
      <img src={boardImage} alt="Snakes and Ladders" className="board-image" />
      {players.map((player, index) => (
        <PlayerToken key={index} player={player} index={index} />
      ))}
    </div>
  );
};

export default Board;
