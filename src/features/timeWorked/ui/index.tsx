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

  const TimePost = async (dailyTimeWorked: string, recordDate: string) => {
    try {
      const response = await axios.post(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/attendance`,
        { dailyTimeWorked, recordDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (e: any) {
      console.error('Ошибка при сохранении данных о времени работы', e);
      throw e;
    }
  };

  const handleSaveClick = async () => {
    const timeWorkedPattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    const isTimeWorkedValid = timeWorkedPattern.test(dailyTimeWorked);
    const isDateValid = datePattern.test(recordDate);

    setIsDailyTimeWorkedValid(isTimeWorkedValid);
    setIsRecordDateValid(isDateValid);

    if (!isTimeWorkedValid) {
      console.error('Неверный формат времени работы');
      return;
    }

    if (!isDateValid) {
      console.error('Неверный формат даты');
      return;
    }

    try {
      await TimePost(dailyTimeWorked, recordDate);
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении данных о времени работы', error);
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
          />
        </Box>
        <Box mt={2}>
          <Input
            type="date"
            value={recordDate}
            placeholder="Дата (YYYY-MM-DD)"
            setValue={setRecordDate}
            setValid={setIsRecordDateValid}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onClose} color="primary" variant="contained">
            Отмена
          </Button>
          <Button onClick={handleSaveClick} color="primary" variant="contained">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
