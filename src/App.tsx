import React, { useState, useCallback, useMemo } from "react";
import "./index.css";

import { PLAYERS, POSITIONS } from "./data";
import { generatePositions } from "./generator";
import { ActivePlayer, ActivePlayerOutcome } from "./types";

function App() {
  const [players, setPlayers] = useState<ActivePlayer[]>(
    PLAYERS.map((p) => ({ ...p, available: true }))
  );

  const [positions, setPositions] = useState<ActivePlayerOutcome[]>([]);

  const overrides = useMemo(() => {
    return new Set(
      players.filter((p) => !!p.overridePosition).map((p) => p.overridePosition)
    );
  }, [players]);

  const onGeneratePositions = useCallback(() => {
    const positions = generatePositions(players, POSITIONS);
    setPositions(positions);
  }, [players]);

  const onAvailableClicked = useCallback((e: any, p: ActivePlayer) => {
    const temp = [...players];
    const tp = temp.find((t) => t.name === p.name);
    tp!.available = e.target.checked;
    tp!.overridePosition = undefined;
    setPlayers(temp);
  }, []);

  const onOverrideChanged = useCallback((e: any, player: ActivePlayer) => {
    const temp = [...players];
    temp.find((t) => t.name === player.name)!.overridePosition =
      e.target.value === "any" ? undefined : e.target.value;
    setPlayers(temp);
  }, []);

  return (
    <div className="App">
      <table cellSpacing={2}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Available</th>
            <th>Override Position</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => (
            <tr key={`player-${p.name}-${idx}`}>
              <td>
                {p.name} ({p.gender}){" "}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={p.available}
                  onChange={(e) => onAvailableClicked(e, p)}
                />
              </td>
              <td>
                {p.available && (
                  <select onChange={(e) => onOverrideChanged(e, p)}>
                    <option value="any">Any</option>
                    {POSITIONS.map((p) => (
                      <option
                        key={`override-${idx}-${p}`}
                        value={p}
                        disabled={overrides.has(p)}
                      >
                        {p}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <button onClick={onGeneratePositions}>Assume Positions</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, idx) => (
            <tr key={`position-${idx}`}>
              <td>{idx + 1}</td>
              <td>{p.name}</td>
              <td>{p.recomendedPosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
