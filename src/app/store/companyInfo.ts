import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '.';

type TCompany = {
  id: number;
  compName: string;
  compAddress: string;
  compLegalAddress: string;
  compFoundationDate: string;
  compWebsite: string;
  compFieldOfActivity: string;
  compRegistrationNumber: string;
  compVAT: string;
};

type TCompanyState = {
  company: TCompany;
};

const initialState: TCompanyState = {
  company: {
    id: 0,
    compName: "",
    compAddress: "",
    compLegalAddress: "",
    compFoundationDate: "",
    compWebsite: "",
    compFieldOfActivity: "",
    compRegistrationNumber: "",
    compVAT: "",
  },
};

const CompanyInfoSlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    setCompanyInfo: (state, action) => {
      state.company = { ...state.company, ...action.payload };
    },
  },
});

export default CompanyInfoSlice.reducer;
export const { setCompanyInfo } = CompanyInfoSlice.actions;
export const companyInfoSelector = (state: RootState) => state.companyInfo.company;
