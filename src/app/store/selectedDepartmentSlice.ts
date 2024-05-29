import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

type SelectedDepartmentState = {
  selectedDepartmentId: number | null;
  selectedDepartmentName: string | null;
};

const initialState: SelectedDepartmentState = {
  selectedDepartmentId: null,
  selectedDepartmentName: null,
};

const selectedDepartmentSlice = createSlice({
  name: "selectedDepartment",
  initialState,
  reducers: {
    setSelectedDepartment: (state, action) => {
      state.selectedDepartmentId = action.payload.id;
      state.selectedDepartmentName = action.payload.name;
    },
  },
});

export const { setSelectedDepartment } = selectedDepartmentSlice.actions;

export const selectedDepartmentSelector = (state: RootState) => state.selectedDepartment;

export default selectedDepartmentSlice.reducer;
