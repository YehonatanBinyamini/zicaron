import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (year, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState();
      if(currentState.jewishCalendar.data && currentState.jewishCalendar.data[year]){
        return {year, items: currentState.jewishCalendar.data[year]};
      }
      
      const apiUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=293397&M=on&s=on&b=20&start=${year}-01-01&end=${year}-12-31`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return {year, items: data.items};
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: "jewishCalendar",
  initialState: {
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { year, items } = action.payload;
        state.status = "succeeded";
        if (state.data && !state.data[year]) {
          state.data = {...state.data};
          state.data[year] = items;
        } else if (!state.data){
          state.data = {[year] : items };
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


// Export the reducer
export const jewishCalendarReducer = dataSlice.reducer;
