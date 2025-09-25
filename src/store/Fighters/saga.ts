import { takeEvery, call, put } from "@redux-saga/core/effects";
import {
  fetchFightersRequest,
  fetchFightersSuccess,
  fetchFightersFailure,
} from "./index";
import { topFightersData } from "../../pages/countries/Mexico/data/topFightersList";
import type { fighterType } from "../../types/fighterType";

function* fetchFightersFromAPI() {
  yield new Promise((resolve) => setTimeout(resolve, 1000));

  return topFightersData;
}

function* fetchFightersSaga() {
  try {
    const fighters: fighterType[] = yield call(fetchFightersFromAPI);
    yield put(fetchFightersSuccess(fighters));
  } catch (error) {
    yield put(
      fetchFightersFailure(
        error instanceof Error ? error.message : "Failed to fetch fighters"
      )
    );
  }
}

export function* watchFetchFighters() {
  yield takeEvery(fetchFightersRequest.type, fetchFightersSaga);
}
