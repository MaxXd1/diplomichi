import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@app/store/types';
import { employeeSelector, setEmployee } from '@app/store/employeeSlice';
import axios from 'axios';
import { companyInfoSelector } from '@app/store/companyInfo';
import { selectedDepartmentSelector } from '@app/store/selectedDepartmentSlice';
import { Modal, Box, Button, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Input } from '@shared/authInput/ui';
import PersonIcon from '@mui/icons-material/Person';
import PhotoIcon from '@mui/icons-material/Photo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';

export interface ProfileInfoModalProps {
  open: boolean;
  handleClose: () => void;
}

type EditDataKeys = 'id' | 'firstName' | 'lastName' | 'employeePhoto' | 'country' | 'phoneNumber' | 'birthDate' | 'position';

export const ProfileInfoModal: React.FC<ProfileInfoModalProps> = ({ open, handleClose }) => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector(employeeSelector);
  const company = useAppSelector(companyInfoSelector);
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;
  const token = localStorage.getItem('token');
  const companyId = company.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    employeePhoto: employee.employeePhoto,
    country: employee.country,
    phoneNumber: employee.phoneNumber,
    birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
    position: employee.position,
  });

  useEffect(() => {
    if (employee.id !== -1) {
      setEditData({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        employeePhoto: employee.employeePhoto,
        country: employee.country,
        phoneNumber: employee.phoneNumber,
        birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
        position: employee.position,
      });
    }
  }, [employee]);

  const handleInputChange = (field: EditDataKeys) => (value: string) => {
    setEditData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSaveClick = async () => {
    console.log('Saving data:', editData);
    try {
      const updatedData = {
        ...editData,
        birthDate: editData.birthDate ? new Date(editData.birthDate).toISOString() : null,
      };

      console.log('Updated data to send:', updatedData);

      const response = await axios.put(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response);

      dispatch(setEmployee(updatedData));
      setIsEditing(false);
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка при обновлении данных сотрудника', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      employeePhoto: employee.employeePhoto,
      country: employee.country,
      phoneNumber: employee.phoneNumber,
      birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
      position: employee.position,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Профиль сотрудника
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            alt={`${employee.firstName} ${employee.lastName}`}
            src={employee.employeePhoto}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
        {isEditing ? (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <Input
              type="text"
              value={editData.firstName}
              placeholder="Имя"
              setValue={handleInputChange('firstName')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="text"
              value={editData.lastName}
              placeholder="Фамилия"
              setValue={handleInputChange('lastName')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="text"
              value={editData.employeePhoto}
              placeholder="Фото URL"
              setValue={handleInputChange('employeePhoto')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="text"
              value={editData.country}
              placeholder="Страна"
              setValue={handleInputChange('country')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="text"
              value={editData.phoneNumber}
              placeholder="Номер телефона"
              setValue={handleInputChange('phoneNumber')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="date"
              value={editData.birthDate}
              placeholder="Дата рождения"
              setValue={handleInputChange('birthDate')}
              setValid={() => {}}
              isValidation={false}
            />
            <Input
              type="text"
              value={editData.position}
              placeholder="Должность"
              setValue={handleInputChange('position')}
              setValid={() => {}}
              isValidation={false}
            />
          </Box>
        ) : (
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Имя" secondary={employee.firstName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Фамилия" secondary={employee.lastName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText primary="Фото URL" secondary={employee.employeePhoto} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Логин" secondary={employee.login} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Страна" secondary={employee.country} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Номер телефона" secondary={employee.phoneNumber} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Дата рождения" secondary={new Date(employee.birthDate).toLocaleDateString()} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Должность" secondary={employee.position} />
            </ListItem>
          </List>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          {isEditing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Сохранить
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                Отмена
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Редактировать
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
