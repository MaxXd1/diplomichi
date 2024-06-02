// DepartmentList.tsx
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@app/store/types";
import { companyInfoSelector } from "@app/store/companyInfo";
import { setSelectedDepartment, selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";
import style from "./index.module.css";
import { getDepartments } from "@shared/api/getDepartment";

type Department = {
  id: number;
  name: string;
};

type DepartmentListProps = {
  shouldRefetch: boolean;
  onDepartmentsFetched: () => void;
};

export const DepartmentList: React.FC<DepartmentListProps> = ({ shouldRefetch, onDepartmentsFetched }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const company = useAppSelector(companyInfoSelector); 
  const selectedDepartment = useAppSelector(selectedDepartmentSelector);
  const dispatch = useAppDispatch();
  const companyId = company.id;
  const token = localStorage.getItem('token'); 

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments(companyId, token);
      setDepartments(data);
      onDepartmentsFetched();
    } catch (error) {
      console.error("Ошибка при получении отделов", error);
    }
  };

  useEffect(() => {
    if (companyId !== 0) {
      fetchDepartments();
    }
  }, [companyId, token]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchDepartments();
    }
  }, [shouldRefetch]);

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
