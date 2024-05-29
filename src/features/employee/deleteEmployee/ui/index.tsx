import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppSelector } from '@app/store/types';
import { companyInfoSelector } from '@app/store/companyInfo';
import { selectedDepartmentSelector } from '@app/store/selectedDepartmentSlice';
import { employeeSelector } from '@app/store/employeeSlice';

type DeleteEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const token = localStorage.getItem('token');
  const company = useAppSelector(companyInfoSelector);
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const employee = useAppSelector(employeeSelector);
  const employeeId = employee.id;
  const employeeName = `${employee.firstName} ${employee.lastName}`;

  const deleteEmployee = async () => {
    try {
      await axios.delete(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Сотрудник успешно удален');
    } catch (e: any) {
      toast.error('Ошибка при удалении сотрудника');
    } finally {
      onClose();
    }
  };

  const handleDeleteClick = () => {
      deleteEmployee();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Удалить сотрудника
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Вы уверены, что хотите удалить сотрудника {employeeName}?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="primary" variant="contained">
            Отмена
          </Button>
          <Button onClick={handleDeleteClick} color="secondary" variant="contained">
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
