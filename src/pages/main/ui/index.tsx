import { DepartmentWrapper } from "@widgets/departmentWrapp/ui";
import { NavBar } from "@widgets/navBar/ui";
import style from './index.module.css';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { setCompanyInfo } from "@app/store/companyInfo";
import { getCompany } from "../models/getCompany";
import { userRole } from "@app/store/authSlice";

export const Main = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(userRole);
  
  useEffect(() => {
    if(role){
      getCompany(dispatch, setCompanyInfo,role);
    }
  }, [role]);

  return (
    <div className={style.main_wrapper}>
      <NavBar />
      <DepartmentWrapper />
    </div>
  );
};
