import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice"
import companyInfoReducer from "./companyInfo"
import displayModeReducer from './displayModeSlice';
import selectedDepartmentReducer from "./selectedDepartmentSlice";
import employeeReducer from './employeeSlice';
import dateReducer from './dateSlice'

export const store = configureStore ({
    reducer:{
        auth:AuthReducer,
        companyInfo: companyInfoReducer,
        displayMode: displayModeReducer,
        selectedDepartment: selectedDepartmentReducer,
        employee: employeeReducer,
        date: dateReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

