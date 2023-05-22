import { createSlice } from "@reduxjs/toolkit";

export const createOrJoinSlice = createSlice({
  name: "createorjoin",
  initialState: {
    createTournamentIsOpen: false,
    joinTournamentIsOpen: false,
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
  },
});

export const {
  openCreateTournament,
  closeCreateTournament,
  openJoinTournament,
  closeJoinTournament,
} = createOrJoinSlice.actions;

export const selectCreateTournamentIsOpen = (state) =>
  state.createorjoin.createTournamentIsOpen;
export const selectJoinTournamentIsOpen = (state) =>
  state.createorjoin.joinTournamentIsOpen;
  export default createOrJoinSlice.reducer;
