import { createSlice } from "@reduxjs/toolkit";
import { getDocsFromFirestore } from "../db/firebase";
import { updateListByMonth } from "../assets/helpers";

const data = await getDocsFromFirestore()
const initialState = {
  list: updateListByMonth(data)
};
const niftarimSlice = createSlice({
  name: "niftarim",
  initialState,
  reducers: {
    addNiftar(state, action) {
      const niftar = action.payload;
      if (state.list[niftar.deathDate.month]){
        state.list[niftar.deathDate.month].push(niftar);
      } else {
        state.list[niftar.deathDate.month] = [niftar];
      }
    },
    deleteNiftar(state, action) {
      // const updatedState = state.favoritesList.filter( item => item.key !== action.payload)
      // return {favoritesList: updatedState};
    },
  },
});

export const niftarimActions = niftarimSlice.actions;
export const niftarimReducer = niftarimSlice.reducer;
