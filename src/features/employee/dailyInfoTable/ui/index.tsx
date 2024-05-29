import { useAppSelector, useAppDispatch } from "@app/store/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from "@mui/material";
import { companyInfoSelector } from "@app/store/companyInfo";
import { selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";
import { setEmployee } from "@app/store/employeeSlice";
import style from "./index.module.css";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hoursWorkedToday: number;
  hoursWorkedThisMonth: number;
};

const defaultSortConfig = { key: 'lastName' as keyof Employee, direction: 'asc' as 'asc' | 'desc' | undefined };

export const DailyInfoTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "asc" | "desc" | undefined }>(defaultSortConfig);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const company = useAppSelector(companyInfoSelector);
  const token = localStorage.getItem('token');
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const dispatch = useAppDispatch();

  const getEmployees = async () => {
    try {
      const response = await axios.get(`https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedData = response.data.data.map((data: any) => ({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        hoursWorkedToday: data.hoursWorkedToday,
        hoursWorkedThisMonth: data.hoursWorkedThisMonth,
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
    if (!sortConfig.direction) {
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
                  active={sortConfig.key === 'firstName'}
                  direction={sortConfig.direction || 'asc'}
                  onClick={() => handleSort('firstName')}
                >
                  Имя
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'lastName'}
                  direction={sortConfig.direction || 'asc'}
                  onClick={() => handleSort('lastName')}
                >
                  Фамилия
                </TableSortLabel>
              </TableCell>
              <TableCell>Отработано часов сегодня</TableCell>
              <TableCell>Отработано часов за месяц</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <TableRow 
                key={employee.id} 
                onClick={() => handleEmployeeClick(employee)} 
                className={selectedEmployeeId === employee.id ? style.activeEmployee : ''}
              >
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.hoursWorkedToday}</TableCell>
                <TableCell>{employee.hoursWorkedThisMonth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
