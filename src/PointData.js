import React from "react";
import "./PointData.css";

function PointData({ teamName, matches, won, lost, draw, gd, points }) {
  return (
    <tr>
      <td>{teamName}</td>
      <td>{matches}</td>
      <td>{won}</td>
      <td>{lost}</td>
      <td>{draw}</td>
      <td>{gd}</td>
      <td>{points}</td>
    </tr>
  );
}

export default PointData;
