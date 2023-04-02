import React, { useMemo } from "react";
import { ActivePlayerOutcome } from "../types";
import { Table, TableBody, Td, Th } from "../ui/Table";
import PlayerCard from "./PlayerCard";

type Props = {
  positions: ActivePlayerOutcome[];
};

const KickingTable: React.FC<Props> = ({ positions: rawPositions }) => {
  const positions = useMemo(() => {
    return rawPositions.sort((a, b) => a.kickingPosition - b.kickingPosition);
  }, [rawPositions]);

  return (
    <Table>
      <thead>
        <tr>
          <Th>Order</Th>
          <Th>Player</Th>
        </tr>
      </thead>
      <TableBody>
        {positions.map((p, idx) => (
          <tr key={`kicking-${idx}`}>
            <Td className="text-center">{p.kickingPosition}</Td>
            <Td>
              <PlayerCard player={p} />
            </Td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default KickingTable;