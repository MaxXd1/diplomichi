import { Modal, Box, Typography, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { setEmployee, employeeSelector } from "@app/store/employeeSlice";
import { CountrySelect } from "@shared/countrySelect/ui";
import { useEffect, useState } from 'react';
import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { companyInfoSelector } from "@app/store/companyInfo";
import axios from "axios";
import { toast } from "react-toastify";
import { selectedDepartmentSelector } from "@app/store/selectedDepartmentSlice";

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

type AddEmployeeProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddEmployeeModal: React.FC<AddEmployeeProps> = ({ isOpen, onClose }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const employee = useAppSelector(employeeSelector);

  const updateEmployee = (value: any) => {
    dispatch(setEmployee(value));
  };

  const company = useAppSelector(companyInfoSelector); 
  const token = localStorage.getItem('token');
  const companyId = company.id;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentId = department.selectedDepartmentId;

  const addEmployee = async () => {
    try {
      const employeeData = {
        ...employee,
        birthDate: new Date(employee.birthDate).toISOString() 
      };
      console.log(employeeData);
      const response = await axios.post(
        `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee`,
        employeeData,
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
      addEmployee(),
      {
        pending: "Запрос обрабатывается",
        success: "Сотрудник добавлен",
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при регистрации.";
          }
        }
      }
    );
    onClose();
  };

  useEffect(() => {
    const isAllFieldsFilled = !!employee.firstName && !!employee.lastName && !!employee.login && !!employee.password && !!employee.employeePhoto && !!employee.country && !!employee.phoneNumber && !!employee.birthDate && !!employee.position;
    const formValid = isAllFieldsFilled && emailValid && passwordValid;
    setIsFormValid(formValid);
  }, [employee, emailValid, passwordValid]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Добавить сотрудника
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <Input
            type="text"
            value={employee.firstName}
            placeholder="Имя"
            setValue={(newValue) =>
              updateEmployee({ firstName: newValue })
            }
          />
          <Input
            type="Second Name"
            value={employee.lastName}
            placeholder="Фамилия"
            setValue={(newValue) =>
              updateEmployee({ lastName: newValue })
            }
          />
          <Input
            type="Phone Number"
            value={employee.phoneNumber}
            placeholder="Моб. телефон"
            setValue={(newValue) =>
              updateEmployee({ phoneNumber: newValue })
            }
          />
          <Input
            type="date"
            value={employee.birthDate}
            placeholder="Дата рождения"
            setValue={(newValue) =>
              updateEmployee({ birthDate: newValue })
            }
          />
          <Input
            type="Position"
            value={employee.position}
            placeholder="Должность"
            setValue={(newValue) =>
              updateEmployee({ position: newValue })
            }
          />
          <Input
            type="login"
            value={employee.login}
            placeholder="Email"
            setValue={(newValue) => updateEmployee({ login: newValue })}
            setValid={setEmailValid}
            isValidation
          />
          <Input
            type="Password"
            value={employee.password}
            placeholder="Password"
            setValue={(newValue) =>
              updateEmployee({ password: newValue })
            }
            setValid={setPasswordValid}
            isValidation
          />
          <Input
            type="file"
            value={employee.employeePhoto}
            placeholder="Photo"
            setValue={(newValue) =>
              updateEmployee({ employeePhoto: newValue })
            }
          />
          <CountrySelect
            value={employee.country}
            setValue={(newValue) => updateEmployee({ country: newValue })}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={onClose} color="primary" variant="contained">
              Закрыть
            </Button>
            <Button onClick={handleAddClick} color="primary" variant="contained" disabled={!isFormValid}>
              Добавить
            </Button>
          </Box>
          {!emailValid && <div className={style.validate}>Не верный email</div>}
          {!passwordValid && (
            <div className={style.validate}>Пароль: минимум 8 символов, заглавная буква и цифра.</div>
          )}
        </Box>
      </Box>
    </Modal>
  );
};
