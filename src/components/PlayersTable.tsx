import React, { useMemo } from "react";
import { ActivePlayer } from "../types";

type Props = {
  players: ActivePlayer[];
  positions: string[];

  onAvailableChanged: (player: ActivePlayer, available: boolean) => void;
  onOverrideChanged: (player: ActivePlayer, position: string) => void;
};

const PlayersTable: React.FC<Props> = (props) => {
  const overrides = useMemo(() => {
    return new Set(
      props.players
        .filter((p) => !!p.overridePosition)
        .map((p) => p.overridePosition)
    );
  }, [props.players]);

  return (
    <table className="players-table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Available</th>
          <th>Override Position</th>
        </tr>
      </thead>
      <tbody>
        {props.players.map((player, idx) => (
          <tr key={`player-${player.name}-${idx}`}>
            <td>
              {player.name} ({player.gender}){" "}
            </td>
            <td>
              <input
                type="checkbox"
                checked={player.available}
                onChange={(e) =>
                  props.onAvailableChanged(player, e.target.checked)
                }
              />
            </td>
            <td>
              {player.available && (
                <select
                  onChange={(e) =>
                    props.onOverrideChanged(player, e.target.value)
                  }
                >
                  <option value="any">Any</option>
                  {props.positions.map((p) => (
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
  );
};

export default PlayersTable;
