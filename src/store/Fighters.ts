import { createSlice } from "@reduxjs/toolkit";
import type { fighterType } from "../types/fighterType";

interface FighterState {
  fightersList: fighterType[];
  selectedFighter: fighterType | null;
}


const initialState = {
  fightersList: [],
  selectedFighter: null,
};

export const fighterSlice = createSlice({
  name: "fighters",
  initialState,
  reducers: {
    setFightersList: (state, action) => {
      state.fightersList = action.payload;
    },
  },
});

export const { setFightersList } = fighterSlice.actions;

export const selectFightersState = (state: { fighter: FighterState; }) => state.fighter;

export default fighterSlice.reducer;
