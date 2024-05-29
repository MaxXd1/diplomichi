import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Input } from '@shared/authInput/ui';
import axios from 'axios';
import { useAppSelector } from '@app/store/types';
import { companyInfoSelector } from '@app/store/companyInfo';
import { selectedDepartmentSelector } from '@app/store/selectedDepartmentSlice';

type TimeTrackingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employeeId: number;
  onSave: (data: { dailyTimeWorked: string; recordDate: string }) => void;
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

export const TimeWorkedModal: React.FC<TimeTrackingModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [dailyTimeWorked, setDailyTimeWorked] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [isDailyTimeWorkedValid, setIsDailyTimeWorkedValid] = useState(true);
  const [isRecordDateValid, setIsRecordDateValid] = useState(true);

  const company = useAppSelector(companyInfoSelector);
  const token = localStorage.getItem('token');
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;

  const TimePost = async (data: { dailyTimeWorked: string; recordDate: string }) => {
    try {
      const response = await axios.post(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee/${0}/attendance`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e: any) {
      throw e;
    }
  };

  const handleSaveClick = async () => {
    if (isDailyTimeWorkedValid && isRecordDateValid) {
      const data = { dailyTimeWorked, recordDate };
      try {
        await TimePost(data);
        onSave(data);
        onClose();
      } catch (error) {
        console.error('Ошибка при сохранении данных о времени работы', error);
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Списание времени
        </Typography>
        <Box mt={2}>
          <Input
            type="text"
            value={dailyTimeWorked}
            placeholder="Время работы (HH:MM:SS)"
            setValue={setDailyTimeWorked}
            setValid={setIsDailyTimeWorkedValid}
            isValidation={true}
          />
        </Box>
        <Box mt={2}>
          <Input
            type="date"
            value={recordDate}
            placeholder="Дата (YYYY-MM-DD)"
            setValue={setRecordDate}
            setValid={setIsRecordDateValid}
            isValidation={true}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="primary" variant="contained">
            Отмена
          </Button>
          <Button onClick={handleSaveClick} color="secondary" variant="contained">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
