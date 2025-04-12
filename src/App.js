import React from "react";
import GameComponent from "./components/GameComponent";
import boardImage from "./assets/board.png";
// import "./styles/App.css";

const App = () => {
  return (
    <div className="app-container">
      <GameComponent boardImage={boardImage} />
    </div>
  );
};

export default App;