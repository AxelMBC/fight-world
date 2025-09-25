import { createSlice, createAction } from "@reduxjs/toolkit";
import type { fighterType } from "../../types/fighterType";

interface FighterState {
  fightersList: fighterType[];
  selectedFighter: fighterType | null;
  loading: boolean;
  error: string | null;
}

// Action types
export const FETCH_FIGHTERS_REQUEST = 'FETCH_FIGHTERS_REQUEST';
export const FETCH_FIGHTERS_SUCCESS = 'FETCH_FIGHTERS_SUCCESS';
export const FETCH_FIGHTERS_FAILURE = 'FETCH_FIGHTERS_FAILURE';

// Action creators
export const fetchFightersRequest = createAction(FETCH_FIGHTERS_REQUEST);
export const fetchFightersSuccess = createAction<fighterType[]>(FETCH_FIGHTERS_SUCCESS);
export const fetchFightersFailure = createAction<string>(FETCH_FIGHTERS_FAILURE);


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
  extraReducers: (builder) => {
    builder
      .addCase(fetchFightersRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFightersSuccess, (state, action) => {
        state.loading = false;
        state.fightersList = action.payload;
        state.error = null;
      })
      .addCase(fetchFightersFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFightersList, setSelectedFighter, setLoading, setError } = fighterSlice.actions;

export const selectFightersState = (state: { fighter: FighterState; }) => state.fighter;

export default fighterSlice.reducer;
