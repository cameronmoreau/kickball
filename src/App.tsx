import "./index.css";

import GameSetup from "./scenes/GameSetup";
import InGame from "./scenes/InGame";
import { GameState } from "./types";

import StateProvider from "./state";
import { usePersistentState } from "./localStorage";

function App() {
  const [gameState, setGameState] = usePersistentState<GameState>(
    "game_state",
    "setup"
  );

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
