import { createSlice } from "@reduxjs/toolkit";
import type { fighterType } from "@/types/fighterType";

interface FighterState {
  fightersList: fighterType[];
  selectedFighter: fighterType | null;
  loading: boolean;
  error: string | null;
}

const initialState: FighterState = {
  fightersList: [],
  selectedFighter: null,
  loading: false,
  error: null,
};

export const fighterSlice = createSlice({
  name: "fighters",
  initialState,
  reducers: {
    setFightersList: (state, action) => {
      state.fightersList = action.payload;
    },
    setSelectedFighter: (state, action) => {
      state.selectedFighter = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFightersList, setSelectedFighter, setLoading, setError } =
  fighterSlice.actions;

export const selectFightersState = (state: { fighter: FighterState }) =>
  state.fighter;

export default fighterSlice.reducer;
