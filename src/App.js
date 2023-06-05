import React, { useEffect } from "react";
import Login from "./Login";
import "./App.css";
import CreateOrJoin from "./CreateOrJoin";
import FixtureList from "./FixtureList";
import PointTable from "./PointTable";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import { auth } from "./Firebase";

import {
  selectCreateTournamentIsOpen,
  selectJoinTournamentIsOpen,
} from "./features/createOrJoinSlice";
import CreateTournament from "./CreateTournament";
import JoinTournament from "./JoinTournament";
import Header from "./Header";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const createTournamentIsOpen = useSelector(selectCreateTournamentIsOpen);
  const joinTournamentIsOpen = useSelector(selectJoinTournamentIsOpen);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <div className="app-body">
            <Header />
            <Routes>
              <Route path="/" element={<CreateOrJoin />} />
              <Route path="/fixtures" element={<FixtureList />} />
              <Route path="/pointtable" element={<PointTable />} />
            </Routes>
          </div>
          {createTournamentIsOpen && <CreateTournament />}
          {joinTournamentIsOpen && <JoinTournament />}
        </div>
      )}
    </Router>
  );
}

export default App;
