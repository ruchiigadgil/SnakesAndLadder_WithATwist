# Indian Constitution-Themed Snakes & Ladders Game 

A fun and educational React-based twist on the classic Snakes and Ladders board game — where each snake or ladder triggers a quiz about the Indian Constitution! Learn while you play and race your opponent (the computer) to the 100th block!

---

##  Tech Stack

- Frontend: React.js (Hardcoded backend)
- Styling:Vanilla CSS modules (per component)
- Data Handling: Hardcoded MCQs and game logic in plain JS
- Assets: Custom board image and token icons

## Folder Structure

src/
├── assets/               # Board and token images
│   ├── board.png
│   ├── token-user.png
│   └── token-computer.png
│
├── components/           # UI and game logic components
│   ├── Board.jsx
│   ├── Dice.jsx
│   ├── GameComponent.jsx
│   ├── PlayerToken.jsx
│   └── QuestionModal.jsx
│
│
├── styles/               # CSS files per component
│   ├── App.css
│   ├── Board.css
│   ├── Dice.css
│   ├── GameComponent.css
│   ├── Player.css
│   ├── PlayerToken.css
│   └── QuestionModal.css
│
├── utils/                # Game logic utilities
│   ├── jumps.js          # Snake & ladder positions
│   └── positionMap.js    # Cell coordinates on the board image
│
├── App.js


---

##  How the Game Works

- The user and computer take turns rolling the dice.
- Landing at the base of a ladder or mouth of a snake triggers a quiz.
- Answer correctly to climb the ladder or avoid the snake.
- Wrong answer? Miss the ladder or slide down the snake!
- First player to reach block 100 wins

---

## Ladder Positions
export const ladders = {
  5: 58,
  14: 49,
  42: 60,
  53: 72,
  64: 83,
  75: 94,
};

## Snake Positions
export const snakes = {
  38: 20,
  45: 7,
  51: 10,
  76: 54,
  91: 73,
  97: 61,
};

## Highlights
Learn about the Indian Constitution in an interactive way
Clean UI with custom tokens and board
Turn-based logic between player and computer
Multiple-choice questions

## Running the Project Locally
npm install
npm start




