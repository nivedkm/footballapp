import React from "react";
import PointData from "./PointData";
import "./PointTable.css";

function PointTable() {
  return (
    <div className="pointtable">
      <table className="pointtable-table">
        <tr className="pointtable-head">
          <th>Team Name</th>
          <th>Matches</th>
          <th>Won</th>
          <th>Lost</th>
          <th>Draw</th>
          <th>Points</th>
        </tr>
        <tbody className="pointtable-body">
          <PointData
            teamName="Team 1"
            won={3}
            lost={4}
            matches={7}
            draw={0}
            points={9}
          />
          <PointData />
          <PointData />
          <PointData />
          <PointData />
          <PointData />
          <PointData />
          <PointData />
        </tbody>
      </table>
    </div>
  );
}

export default PointTable;
