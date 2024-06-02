import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@app/store/types';
import { companyInfoSelector } from '@app/store/companyInfo';
import { selectedDepartmentSelector } from '@app/store/selectedDepartmentSlice';
import { getEmployees } from '@shared/api/getEmployees';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';
import { setEmployee } from '@app/store/employeeSlice';
import style from './index.module.css';
import { ProfileInfoModal } from '@features/profileInfoModal/ui';

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
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' | undefined }>({
    key: 'lastName',
    direction: undefined,
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const company = useAppSelector(companyInfoSelector);
  const token = localStorage.getItem('token');
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (departmentId !== null) {
      getEmployees(companyId, departmentId, token || '')
        .then(setEmployees)
        .catch((error) => {
          console.error('Error fetching employees', error);
        });
    }
  }, [departmentId, companyId, token]);

  const handleSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' | undefined = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = undefined;
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortConfig.direction) {
      return 0;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployeeId(employee.id);
    dispatch(setEmployee(employee));
  };

  const handleEmployeeDoubleClick = (employee: Employee) => {
    handleEmployeeClick(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  direction={sortConfig.direction}
                  onClick={() => handleSort('firstName')}
                >
                  Имя
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'lastName'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('lastName')}
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
                onDoubleClick={() => handleEmployeeDoubleClick(employee)}
                className={selectedEmployeeId === employee.id ? style.activeEmployee : ''}
              >
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.login}</TableCell>
                <TableCell>{employee.country}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{new Date(employee.birthDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProfileInfoModal open={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};
