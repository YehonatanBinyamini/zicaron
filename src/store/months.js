import { createSlice } from "@reduxjs/toolkit";
import { getMonthInfo } from "../assets/calendarAPI";



const currentDate = new Date();
const {DaysArray, heMonthsTitle} = getMonthInfo(
  currentDate.getFullYear(),
  currentDate.getMonth()
);
const initialState = {
  monthsList: [],
  currentMonthArray: DaysArray,
  displayingTimestamp: currentDate.getTime(),
  heMonthsTitle: heMonthsTitle,
  // jewishCalendar: {"2023": await fetchData(currentDate.getFullYear())}
};
const monthsSlice = createSlice({
  name: "months",
  initialState,
  reducers: {
    setNextMonth(state) {
      const currentDate = new Date(state.displayingTimestamp);
      currentDate.setMonth(currentDate.getMonth() + 1);
      const {DaysArray, heMonthsTitle} = getMonthInfo(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      state.heMonthsTitle = heMonthsTitle;
      state.displayingTimestamp = currentDate.getTime();
      state.currentMonthArray = DaysArray;
    },
    setPreviousMonth(state) {
      const currentDate = new Date(state.displayingTimestamp);

      currentDate.setMonth(currentDate.getMonth() - 1);
      const {DaysArray, heMonthsTitle} = getMonthInfo(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      state.heMonthsTitle = heMonthsTitle;
      state.displayingTimestamp = currentDate.getTime();
      state.currentMonthArray = DaysArray;
    },
  },
});

export const monthsActions = monthsSlice.actions;
export const monthsReducer = monthsSlice.reducer;
