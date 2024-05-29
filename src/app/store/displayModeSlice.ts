import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type DisplayMode = 'Общ информация' | 'За день' | 'За месяц' | '';

interface DisplayModeState {
  mode: DisplayMode;
}

const initialState: DisplayModeState = {
  mode: 'Общ информация',
};

const displayModeSlice = createSlice({
  name: 'displayMode',
  initialState,
  reducers: {
    setDisplayMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setDisplayMode } = displayModeSlice.actions;

export const selectDisplayMode = (state: RootState) => state.displayMode.mode;

export default displayModeSlice.reducer;
