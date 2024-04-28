import { createSlice } from "@reduxjs/toolkit";
import { getDocsFromFirestore } from "../db/firebase";
import { updateListByMonth } from "../assets/helpers";

const data = await getDocsFromFirestore()
const initialState = {
  list: updateListByMonth(data), data: data
};
const niftarimSlice = createSlice({
  name: "niftarim",
  initialState,
  reducers: {
    addNiftar(state, action) {
      const niftar = action.payload;
      // if (state.list[niftar.deathDate.month]){
      //   state.list[niftar.deathDate.month].push(niftar);
      // } else {
      //   state.list[niftar.deathDate.month] = [niftar];
      // }
      state.data.push(niftar);
      state.list = updateListByMonth(state.data);
    },
    deleteNiftar(state, action) {
      const niftarIdToDelete = action.payload;
      // Loop through months
      for (const month in state.list) {
        if (state.list.hasOwnProperty(month)) {
          // Filter out the niftar with the specified ID
          const updatedNiftars = state.list[month].filter((niftar) => niftar.id !== niftarIdToDelete);
          
          // Update the list for the current month
          state.list[month] = updatedNiftars;
        }
      }
      state.data = state.data.filter(niftar => niftar.id !== niftarIdToDelete);
    },
    updateNiftar(state, action) {
      const { id, editedNiftar } = action.payload;
      const updatedData = state.data.filter(niftar => niftar.id !== id);
      console.log(id+"$$$$$$$$$$$$$")
      updatedData.push(editedNiftar);
      state.data = updatedData;
      state.list = updateListByMonth(updatedData);
      // const updatedData = state.data.map(niftar => {
      //   if (niftar.id === id) {
      //     return editedNiftar; // Replace the edited niftar
      //   } else {
      //     return niftar; // Keep the niftar unchanged
      //   }
      // });
    
      // return {
      //   ...state,
      //   data: updatedData,
      //   list: updateListByMonth(updatedData), // Assuming updateListByMonth function accepts an array
      // };
    }
    
  },
});

export const niftarimActions = niftarimSlice.actions;
export const niftarimReducer = niftarimSlice.reducer;
