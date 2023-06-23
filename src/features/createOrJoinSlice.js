import { createSlice } from "@reduxjs/toolkit";

export const createOrJoinSlice = createSlice({
  name: "createorjoin",
  initialState: {
    createTournamentIsOpen: false,
    joinTournamentIsOpen: false,
    tournamentName: "",
  },
  reducers: {
    openCreateTournament: (state) => {
      state.createTournamentIsOpen = true;
    },
    closeCreateTournament: (state) => {
      state.createTournamentIsOpen = false;
    },
    openJoinTournament: (state) => {
      state.joinTournamentIsOpen = true;
    },
    closeJoinTournament: (state) => {
      state.joinTournamentIsOpen = false;
    },
    setTournamentName: (state, action) => {
      state.tournamentName = action.payload;
    },
  },
});

export const {
  openCreateTournament,
  closeCreateTournament,
  openJoinTournament,
  closeJoinTournament,
  setTournamentName,
} = createOrJoinSlice.actions;

export const selectCreateTournamentIsOpen = (state) =>
  state.createorjoin.createTournamentIsOpen;
export const selectJoinTournamentIsOpen = (state) =>
  state.createorjoin.joinTournamentIsOpen;
export const selectSetTournamentNameIsOpen = (state) =>
  state.createorjoin.tournamentName;
export default createOrJoinSlice.reducer;
