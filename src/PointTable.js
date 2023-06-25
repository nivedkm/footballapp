import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSetTournamentNameIsOpen } from "./features/createOrJoinSlice";
import PointData from "./PointData";
import "./PointTable.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./Firebase";

function PointTable() {
  const tournamentName = useSelector(selectSetTournamentNameIsOpen);
  const [pointTable, setPointTable] = useState(() => {
    // Retrieve point table from localStorage or initialize as an empty array
    const storedPointTable = localStorage.getItem("pointTable");
    return storedPointTable ? JSON.parse(storedPointTable) : [];
  });

  useEffect(() => {
    const fetchPointTable = async () => {
      const tournamentQuerySnapshot = await getDocs(
        query(
          collection(db, "Tournaments"),
          where("tname", "==", tournamentName)
        )
      );
      if (tournamentQuerySnapshot.size === 1) {
        const tournamentDocRef = tournamentQuerySnapshot.docs[0].ref;
        const pointTableRef = collection(tournamentDocRef, "pointtable");
        const poinTableSnapshot = await getDocs(pointTableRef);
        const pointTableData = poinTableSnapshot.docs.map((doc) => doc.data());
        setPointTable(pointTableData);
        // Save point table to localStorage
        localStorage.setItem("pointTable", JSON.stringify(pointTableData));
      }
    };

    fetchPointTable().catch((error) => {
      console.log("Error fetching point table:", error);
    });
  }, [tournamentName]);

  return (
    <div className="pointtable">
      <h2 >STANDINGS</h2>
      <table className="pointtable-table">
        <thead>
          <tr className="pointtable-head">
            <th>Team Name</th>
            <th>Matches</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Draw</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody className="pointtable-body">
          {pointTable
            .sort((a, b) => {
              if (a.points === b.points) {
                // Sort by goal difference in descending order when points are equal
                return b.goalDifference - a.goalDifference;
              }
              // Sort by points in descending order
              return b.points - a.points;
            })
            .map((pointData, index) => (
              <PointData
                key={index}
                teamName={pointData.teamName}
                matches={pointData.matches}
                won={pointData.won}
                lost={pointData.lost}
                draw={pointData.draw}
                gd={pointData.goalDifference}
                points={pointData.points}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PointTable;
