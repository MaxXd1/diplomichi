import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@app/store/types";
import { companyInfoSelector } from "@app/store/companyInfo";
import { selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { setEmployee } from "@app/store/employeeSlice";
import style from './index.module.css';

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeePhoto: string;
  login: string;
  country: string;
  phoneNumber: string;
  birthDate: number;
  position: string;
};

export const GeneralInfoTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc" | undefined;
  }>({ key: "lastName", direction: undefined });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const company = useAppSelector(companyInfoSelector);
  const token = localStorage.getItem("token");
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const dispatch = useAppDispatch();

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedData = response.data.data.map((data: any) => ({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        employeePhoto: data.employeePhoto.split("\\").pop(),
        login: data.login,
        country: data.country,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate,
        position: data.position,
      }));
      setEmployees(formattedData);
    } catch (e) {
      console.error("Error fetching employees", e);
    }
  };

  useEffect(() => {
    if (departmentId !== null) {
      getEmployees();
    }
  }, [departmentId]);

  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" | undefined = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = undefined;
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig.direction === undefined) {
      return 0;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleEmployeeClick = (employee: Employee) => {
    dispatch(setEmployee(employee));
    setSelectedEmployeeId(employee.id);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "firstName"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("firstName")}
                >
                  Имя
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "lastName"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("lastName")}
                >
                  Фамилия
                </TableSortLabel>
              </TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Страна</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Дата рождения</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                onClick={() => handleEmployeeClick(employee)}
                className={
                  selectedEmployeeId === employee.id ? style.activeEmployee : ""
                }
              >
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.login}</TableCell>
                <TableCell>{employee.country}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>
                  {new Date(employee.birthDate).toLocaleDateString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
