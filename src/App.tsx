import React, { useState, useCallback } from "react";
import "./index.css";

import { PLAYERS, POSITIONS } from "./data";
import { generatePositions } from "./generator";
import { ActivePlayer, ActivePlayerOutcome } from "./types";

import PositionsTable from "./components/PositionsTable";
import PlayersTable from "./components/PlayersTable";

function App() {
  const [players, setPlayers] = useState<ActivePlayer[]>(
    PLAYERS.map((p) => ({ ...p, available: true }))
  );

  const [positions, setPositions] = useState<ActivePlayerOutcome[]>([]);

  const onGeneratePositions = useCallback(() => {
    const positions = generatePositions(players, POSITIONS);
    setPositions(positions);
  }, [players]);

  const onAvailableChanged = useCallback(
    (player: ActivePlayer, available: boolean) => {
      const temp = [...players];
      const tp = temp.find((t) => t.name === player.name);
      tp!.available = available;
      tp!.overridePosition = undefined;
      setPlayers(temp);
    },
    [players]
  );

  const onOverrideChanged = useCallback(
    (player: ActivePlayer, position: string) => {
      const temp = [...players];
      temp.find((t) => t.name === player.name)!.overridePosition =
        position === "any" ? undefined : position;
      setPlayers(temp);
    },
    [players]
  );

  return (
    <div className="App">
      <PlayersTable
        players={players}
        positions={POSITIONS}
        onAvailableChanged={onAvailableChanged}
        onOverrideChanged={onOverrideChanged}
      />
      <hr />
      <button onClick={onGeneratePositions}>Assume Positions</button>
      {positions.length > 0 && <PositionsTable positions={positions} />}
    </div>
  );
}

export default App;
