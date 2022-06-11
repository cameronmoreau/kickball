import React from "react";
import classnames from "classnames";
import { ActivePlayerOutcome } from "../types";

type Props = {
  positions: ActivePlayerOutcome[];
};

const PositionsTable: React.FC<Props> = (props) => {
  return (
    <table className="positions-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        {props.positions.map((p, idx) => (
          <tr
            key={`position-${idx}`}
            className={classnames({
              "positions-table--override": !!p.overridePosition,
            })}
          >
            <td>{idx + 1}</td>
            <td>{p.name}</td>
            <td>{p.recommendedPosition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PositionsTable;
