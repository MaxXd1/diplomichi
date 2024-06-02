import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@app/store/types";
import { companyInfoSelector } from "@app/store/companyInfo";
import { selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";
import { getEmployees } from "@shared/api/getEmployees";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Button,
  Stack,
} from "@mui/material";
import { setEmployee } from "@app/store/employeeSlice";
import style from "./index.module.css";
import { selectDate } from "@app/store/dateSlice";
import axios from "axios";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  hoursWorkedToday: string;
  hoursWorkedThisMonth: string;
};

const defaultSortConfig = { key: 'lastName' as keyof Employee, direction: 'asc' as 'asc' | 'desc' | undefined };

export const DailyInfoTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "asc" | "desc" | undefined }>(defaultSortConfig);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const company = useAppSelector(companyInfoSelector);
  const token = localStorage.getItem('token');
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const dispatch = useAppDispatch();
  const attendanceDate = useAppSelector(selectDate);

  const parseHoursWorked = (hours: string) => {
    const match = hours.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (match) {
      const hours = match[1] ? match[1].slice(0, -1) : '00';
      const minutes = match[2] ? match[2].slice(0, -1) : '00';
      return `${hours.padStart(2, '0')}ч ${minutes.padStart(2, '0')}м`;
    }
    return '00ч 00м';
  };

  const formatDailyTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м`;
  };

  const GetTime = async () => {
    try {
      const response = await axios.get(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/attendance/all/${attendanceDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const fetchedEmployees = response.data.data.map((entry: any) => ({
        id: entry.employee.id,
        firstName: entry.employee.firstName,
        lastName: entry.employee.lastName,
        hoursWorkedToday: formatDailyTime(entry.dailyTimeWorked ? entry.dailyTimeWorked.join(':') : '00:00:00'),
        hoursWorkedThisMonth: parseHoursWorked(entry.hoursThisMonth),
      }));

      setEmployees(fetchedEmployees);
    } catch (e) {
      console.error("Error fetching attendance data", e);
    }
  };

  useEffect(() => {
    if (departmentId !== null && attendanceDate) {
      getEmployees(companyId, departmentId, token || '')
        .then(setEmployees)
        .catch((error) => {
          console.error("Error fetching employees", error);
        });
      GetTime();
    }
  }, [departmentId, companyId, token, attendanceDate]);

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
    setSelectedEmployee(employee);
    setSelectedEmployeeId(employee.id);
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    try {
      await axios.delete(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/attendance/${attendanceDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Запись успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении записи", error);
    }
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
      {selectedEmployee && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Удалить
          </Button>
        </Stack>
      )}
    </div>
  );
};
