import { DepartmentWrapper } from "@widgets/departmentWrapp/ui";
import { NavBar } from "@widgets/navBar/ui";
import style from './index.module.css';
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "@app/store/types";
import { setCompanyInfo } from "@app/store/companyInfo";

export const Main = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  const getCompany = async () => {

    try {
      const response = await axios.get('https://apiwithdb-u82g.onrender.com/company', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const company = response.data.data[0];
      console.log(response.data.data);
      const formattedCompany = {
        ...company,
        compFoundationDate: new Date(company.compFoundationDate).toISOString(),
      };
      dispatch(setCompanyInfo(formattedCompany));
    } catch (e) {
      console.error("Error fetching company", e);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className={style.main_wrapper}>
      <NavBar />
      <DepartmentWrapper />
    </div>
  );
};
