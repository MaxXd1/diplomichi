import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type TEmployee = {
    id:number,
    firstName: string;
    lastName: string;
    employeePhoto: string;
    login: string;
    password: string;
    country: string;
    phoneNumber: string;
    birthDate: string;
    position: string;
}

type TEmployeeState = {
    employee: TEmployee;
}

const initialState: TEmployeeState = {
    employee: {
        id: -1,
        firstName: "",
        lastName: "",
        employeePhoto: "",
        login: "",
        password: "",
        country: "",
        phoneNumber: "",
        birthDate: "",
        position: "",
    },
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployee: (state, action) => {
            state.employee = { ...state.employee, ...action.payload };
        },
    },
});

export const { setEmployee } = employeeSlice.actions;
export const employeeSelector = (state: RootState) => state.employee.employee;
export default employeeSlice.reducer;
