import React, { useMemo } from "react";
import { ActivePlayer } from "../types";

import Switch from "../ui/Switch";
import Select from "../ui/Select";
import PlayerCard from "./PlayerCard";

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
    <div className="flow-root">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="py-4 sticky z-10 top-0 border-b border-gray-200 bg-white font-semibold text-left">
              Player
            </th>
            <th className="py-4 sticky z-10 top-0 border-b border-gray-200 bg-white font-semibold text-left">
              Available
            </th>
            <th className="py-4 sticky z-10 top-0 border-b border-gray-200 bg-white font-semibold text-left">
              Position
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {props.players.map((player, idx) => (
            <tr
              key={`player-${player.name}-${idx}`}
              className={idx % 2 === 0 ? undefined : "bg-gray-50"}
            >
              <td className="py-4">
                <PlayerCard player={player} />
              </td>
              <td className="py-4">
                <Switch
                  checked={player.available}
                  onChange={(checked) =>
                    props.onAvailableChanged(player, checked)
                  }
                />
              </td>
              <td className="py-4">
                {player.available && (
                  <Select
                    name="override"
                    onChange={(e) =>
                      props.onOverrideChanged(player, e.target.value)
                    }
                    options={[
                      { value: "any", label: "Any" },
                      ...props.positions.map((p) => ({
                        value: p,
                        label: p,
                        disabled: overrides.has(p),
                      })),
                    ]}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
