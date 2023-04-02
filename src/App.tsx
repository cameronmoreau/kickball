import "./index.css";

import { useState } from "react";
import GameSetup from "./scenes/GameSetup";
import InGame from "./scenes/InGame";
import { GameState } from "./types";

import StateProvider from "./state";

function App() {
  const [gameState, setGameState] = useState<GameState>("setup");

  if (gameState === "setup") {
    return <GameSetup onReady={() => setGameState("active")} />;
  }

  if (gameState === "active") {
    return <InGame />;
  }

  return null;
}

const AppWithState = () => (
  <StateProvider>
    <App />
  </StateProvider>
);

export default AppWithState;
