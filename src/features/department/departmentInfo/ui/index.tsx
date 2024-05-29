import { useState, useEffect } from 'react';
import { useAppSelector } from '@app/store/types';
import { companyInfoSelector } from '@app/store/companyInfo';
import InfoIcon from '@mui/icons-material/Info';
import { CompanyInfoModal } from '@features/companyInfoModal/ui';
import style from "./index.module.css";
import { selectedDepartmentSelector } from '@app/store/selectedDepartmentSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { AddEmployeeModal } from '@features/employee/addEmployee/ui';
import { DeleteEmployeeModal } from '@features/employee/deleteEmployee/ui'; // Импортируем модальное окно удаления
import { selectDate } from '@app/store/dateSlice';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export const DepartmentInfo = () => {
  const company = useAppSelector(companyInfoSelector);
  const compName = company.compName;
  const department = useAppSelector(selectedDepartmentSelector);
  const departmentName = department.selectedDepartmentName;
  const date = useAppSelector(selectDate);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isDeleteEmployeeModalOpen, setIsDeleteEmployeeModalOpen] = useState(false); // Состояние для модального окна удаления

  // Helper function to parse the date string
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return { day, month, year };
  };

  const { day, month, year } = parseDate(date);

  useEffect(() => {
  
  }, []);

  const handleInfoClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleAddEmployeeClick = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleDeleteEmployeeClick = () => {
    setIsDeleteEmployeeModalOpen(true); 
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  const handleCloseDeleteEmployeeModal = () => {
    setIsDeleteEmployeeModalOpen(false); 
  }

  const handleTimeWorkedModel = () => {

  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>{compName} / {departmentName}</h1>
      <div className={style.date_container}>
        <div className={style.date}>{day}.{month}.{year}</div>
        <div className={style.buttons}>
          <button className={style.info_button} onClick={handleAddEmployeeClick}>
            <PersonAddIcon />
          </button>
          <button className={style.info_button} onClick={handleDeleteEmployeeClick}>
            <PersonRemoveIcon />
          </button>
          <button className={style.info_button} onClick={handleInfoClick}>
            <InfoIcon />
          </button>
          <button className={style.info_button} onClick={handleTimeWorkedModel}>
            <PendingActionsIcon/>
          </button>
        </div>
      </div>
      <CompanyInfoModal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
      <AddEmployeeModal isOpen={isAddEmployeeModalOpen} onClose={handleCloseAddEmployeeModal} />
      <DeleteEmployeeModal
        isOpen={isDeleteEmployeeModalOpen}
        onClose={handleCloseDeleteEmployeeModal}
      />
    </div>
  );
}
