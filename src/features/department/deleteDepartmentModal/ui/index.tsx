import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { companyInfoSelector } from "@app/store/companyInfo";
import { useAppSelector } from "@app/store/types";
import style from './index.module.css';

type Props = {
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
  color: 'black',
};

export const DeleteDepartmentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [departments, setDepartments] = useState<{ id: number, name: string }[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const company = useAppSelector(companyInfoSelector); 
  const token = localStorage.getItem('token');
  const companyId = company.id;

  useEffect(() => {
    if (isOpen) {
      fetchDepartments();
    }
  }, [isOpen]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`https://apiwithdb-u82g.onrender.com/company/${companyId}/departments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(response.data);
    } catch (e) {
      console.error("Error fetching departments", e);
    }
  };

  const deleteDepartment = async () => {
    try {
      await axios.delete(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Отдел успешно удален!');
      onClose();
      fetchDepartments();
    } catch (e: any) {
      toast.error('Ошибка при удалении отдела');
      throw e; 
    }
  };

  const handleDeleteClick = () => {
    deleteDepartment();
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Удалить отдел
        </Typography>
        <div>
          <select id="department-select" value={selectedDepartment} onChange={handleChange} className={style.select}>
            <option value="" disabled>
              Выберите отдел
            </option>
            {departments.map((department) => (
              <option key={department.id} value={department.id.toString()}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="primary" variant="contained">
            Закрыть
          </Button>
          <Button onClick={handleDeleteClick} color="primary" variant="contained">
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
