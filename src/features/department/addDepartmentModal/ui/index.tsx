import { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { Input } from "@shared/authInput/ui";
import { companyInfoSelector } from "@app/store/companyInfo";
import { useAppSelector } from "@app/store/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // onAddDepartment: (name: string) => void;
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
};

export const AddDepartmentModal: React.FC<Props> = ({ isOpen, onClose  }) => {
  const [name, setName] = useState('');
    const company = useAppSelector(companyInfoSelector); 
    const token = localStorage.getItem('token');
    const companyId = company.id;
 
  const addDepartment = async () => {
    
    try {
      const response = await axios.post(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments`,
        {name},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw e; 
    }
  };

  const handleAddClick = () => {
    toast.promise(
      addDepartment(),
      {
        pending: "Запрос обрабатывается",
        success: "Отдел создан",
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при регистрации.";
          }
        }
      }
    );
    // onAddDepartment(departmentName);
    setName('');
    onClose();
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
          Добавить отдел
        </Typography>
        <Input
          type="text"
          placeholder="Название отдела"
          value={name}
          setValue={setName}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="primary" variant="contained">
            Закрыть
          </Button>
          <Button onClick={handleAddClick} color="primary" variant="contained">
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
