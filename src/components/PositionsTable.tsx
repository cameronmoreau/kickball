import React, { useMemo } from "react";
import { POSITIONS } from "../data";
import { ActivePlayerOutcome } from "../types";
import Checkbox from "../ui/Checkbox";
import { Table, TableBody, Td, Th } from "../ui/Table";
import PlayerCard from "./PlayerCard";

type Props = {
  positions: ActivePlayerOutcome[];
  selectedIndexes: Set<number>;
  onSelectChanged: (idx: number, selected: boolean) => void;
};

const ORDER_MAP = POSITIONS.reduce(
  (acc, pos, i) => ({
    ...acc,
    [pos]: i,
  }),
  { Bench: POSITIONS.length }
) as { [k: string]: number };

const PositionsTable: React.FC<Props> = ({
  positions: rawPositions,
  selectedIndexes,
  onSelectChanged,
}) => {
  const positions = useMemo(() => {
    return rawPositions.sort(
      (a, b) =>
        ORDER_MAP[a.recommendedPosition] - ORDER_MAP[b.recommendedPosition]
    );
  }, [rawPositions]);

  return (
    <Table>
      <thead>
        <tr>
          <Th />
          <Th>Player</Th>
          <Th>Position</Th>
        </tr>
      </thead>
      <TableBody>
        {positions.map((p, idx) => (
          <tr
            key={`position-${idx}`}
            onClick={() => onSelectChanged(idx, !selectedIndexes.has(idx))}
          >
            <Td>
              <Checkbox
                id={`checkbox-${idx}`}
                checked={selectedIndexes.has(idx)}
                onChange={(e) => onSelectChanged(idx, e.target.checked)}
              />
            </Td>
            <Td>
              <PlayerCard player={p} />
            </Td>
            <Td>{p.recommendedPosition}</Td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default PositionsTable;
