import React from "react";
import { ActivePlayerOutcome } from "../types";
import Checkbox from "../ui/Checkbox";
import { Table, TableBody, Td, Th } from "../ui/Table";
import PlayerCard from "./PlayerCard";

type Props = {
  positions: ActivePlayerOutcome[];
  selectedIndexes: Set<number>;
  onSelectChanged: (idx: number, selected: boolean) => void;
};

const PositionsTable: React.FC<Props> = (props) => {
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
        {props.positions.map((p, idx) => (
          <tr key={`position-${idx}`}>
            <Td>
              <Checkbox
                id={`checkbox-${idx}`}
                checked={props.selectedIndexes.has(idx)}
                onChange={(e) => props.onSelectChanged(idx, e.target.checked)}
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
