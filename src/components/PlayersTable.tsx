import React, { useMemo } from "react";
import { ActivePlayer } from "../types";

import Switch from "../ui/Switch";
import Select from "../ui/Select";
import PlayerCard from "./PlayerCard";
import { Table, TableBody, Td, Th } from "../ui/Table";

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
    <Table>
      <thead>
        <tr>
          <Th>Player</Th>
          <Th>Available</Th>
          <Th>Position</Th>
        </tr>
      </thead>
      <TableBody>
        {props.players.map((player, idx) => (
          <tr key={`player-${player.name}-${idx}`}>
            <Td>
              <PlayerCard player={player} />
            </Td>
            <Td>
              <Switch
                checked={player.available}
                onChange={(checked) =>
                  props.onAvailableChanged(player, checked)
                }
              />
            </Td>
            <Td>
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
            </Td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersTable;
