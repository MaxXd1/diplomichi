import { useState, useEffect } from "react";
import axios from "axios";
import style from "./index.module.css";
import { useAppSelector, useAppDispatch } from "@app/store/types";
import { companyInfoSelector } from "@app/store/companyInfo";
import { setSelectedDepartment, selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";

type Department = {
  id: number;
  name: string;
};

export const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const company = useAppSelector(companyInfoSelector); 
  const selectedDepartment = useAppSelector(selectedDepartmentSelector);
  const dispatch = useAppDispatch();
  const companyId = company.id;
  const token = localStorage.getItem('token'); 

  const getDepartments = async () => {
    try {
      const response = await axios.get(`https://apiwithdb-u82g.onrender.com/company/${companyId}/departments`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      const formattedData = response.data.map((data: any) => ({
        id: data.id,
        name: data.name
      }));
      setDepartments(formattedData);
    } catch (e) {
      console.error("Error fetching departments", e);
    }
  };

  useEffect(() => {
    if (companyId !== 0) {
      getDepartments();
    }
  }, [companyId]);

  const handleDepartmentClick = (department: Department) => {
    dispatch(setSelectedDepartment(department));
  };

  return (
    <div>
      <h2 className={style.title}>Отделы</h2>
      <ul className={style.list}>
        {departments.map((department) => (
          <li 
            key={department.id} 
            className={`${style.list_item} ${selectedDepartment.selectedDepartmentId === department.id ? style.selected : ''}`}
            onClick={() => handleDepartmentClick(department)}
          >
            {department.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
