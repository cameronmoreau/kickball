import React, { useMemo } from "react";
import { ActivePlayerOutcome } from "../types";
import Button from "../ui/Button";
import { Table, TableBody, Td, Th } from "../ui/Table";
import { orderPositionsForKicking } from "../utils";
import PlayerCard from "./PlayerCard";

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

type Props = {
  positions: ActivePlayerOutcome[];
  editLineup?: boolean;
  onMovePlayer: (player: ActivePlayerOutcome, direction: "up" | "down") => void;
};

const KickingTable: React.FC<Props> = ({
  positions: rawPositions,
  editLineup,
  onMovePlayer,
}) => {
  const positions = useMemo(
    () => orderPositionsForKicking(rawPositions),
    [rawPositions]
  );

  return (
    <Table>
      <thead>
        <tr>
          <Th>Order</Th>
          <Th>Player</Th>
          {editLineup && <Th />}
        </tr>
      </thead>
      <TableBody>
        {positions.map((p, idx) => (
          <tr key={`kicking-${idx}`}>
            <Td className="text-center">{p.kickingPosition}</Td>
            <Td>
              <PlayerCard player={p} />
            </Td>
            {editLineup && (
              <Td>
                <div className="flex">
                  <Button
                    onClick={() => onMovePlayer(p, "up")}
                    disabled={p.kickingPosition === 1}
                  >
                    <ArrowUpIcon className="-mr-0.5 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => onMovePlayer(p, "down")}
                    className="ml-2"
                    disabled={p.kickingPosition === positions.length}
                  >
                    <ArrowDownIcon className="-mr-0.5 h-5 w-5" />
                  </Button>
                </div>
              </Td>
            )}
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default KickingTable;
