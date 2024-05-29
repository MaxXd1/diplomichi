import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type TUser = {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    repeatPassword: string;
    country: string;
    role: string;
    employeePhoto: string,
}

type TError = {
    statusCode: number;
    message: string;
}

type TAuthState = {
    user: TUser;
    errors: TError;
}

const initialState: TAuthState = {
    user: {
        firstName:"",
        lastName:"",
        login: "",
        password: "",
        repeatPassword: "",
        country: "",
        role: "",
        employeePhoto: "",
    },
    errors: {
        statusCode: 0,
        message: '',
    }
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setError: (state, action) => {
           state.errors.statusCode = action.payload.statusCode;
           state.errors.message = action.payload.message;
        }
    }
});

export default AuthSlice.reducer;
export const StatusCodeSelector = (state: RootState) => state.auth.errors.statusCode;
export const MessageSelector = (state: RootState) => state.auth.errors.message;
export const userSelector = (state: RootState) => state.auth.user;
export const { setUser, setError } = AuthSlice.actions; 
