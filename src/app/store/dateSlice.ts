import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.'; 

type DateState = string;

type DateSliceState = {
  date: DateState;
}

// Function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Set initial state to current date
const initialState: DateSliceState = {
  date: formatDate(new Date()),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateState>) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export const selectDate = (state: RootState) => state.date.date;

export default dateSlice.reducer;
