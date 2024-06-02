// DepartmentWrapper.tsx
import { FieldSet } from "@entities/fieldset/ui";
import style from "./index.module.css";
import { useState } from "react";
import { Input } from "@shared/authInput/ui";
import { AuthButton } from "@shared/authButton/ui";
import { AddDepartmentModal } from "@features/department/addDepartmentModal/ui";
import { DeleteDepartmentModal } from "@features/department/deleteDepartmentModal/ui"; 
import { DepartmentList } from "@features/department/departmentList/ui";
import { DepartmentInfo } from "@features/department/departmentInfo/ui";
import { EmployeeList } from "@features/employee/employeeList/ui";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { selectDate, setDate } from "@app/store/dateSlice";
import { userRole } from "@app/store/authSlice";

export const DepartmentWrapper = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [shouldRefetchDepartments, setShouldRefetchDepartments] = useState(false);
  const role = useAppSelector(userRole);
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const updateDate = (value: string) => {
    dispatch(setDate(value));
  };

  const handleAddDepartmentClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleDeleteDepartmentClick = () => {
    setIsDeleteModalOpen(true); 
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); 
  };

  const handleDepartmentAdded = () => {
    setShouldRefetchDepartments(true);
  };

  const handleDepartmentsFetched = () => {
    setShouldRefetchDepartments(false);
  };

  return (
    <section className={style.wrapper}>
      <div className={style.div1}>
        <FieldSet />
        <Input
          type="date"
          value={date}
          placeholder="Выберите дату"
          setValue={(newValue) => updateDate(newValue)}
        />
        {role === 'ADMIN' && (
          <div>
            <AuthButton
              color="rgb(7,43,71)"
              text="Добавить отдел"
              refetch={handleAddDepartmentClick}
            />
            <AuthButton
              color="#DC143C"
              text="Удалить отдел"
              refetch={handleDeleteDepartmentClick}
            />
          </div>
        )}
        <DepartmentList
          shouldRefetch={shouldRefetchDepartments}
          onDepartmentsFetched={handleDepartmentsFetched}
        />
      </div>
      <div className={style.content}>
        <div className={style.div2}>
          <DepartmentInfo/>
        </div>
        <div className={style.div3}>
          <EmployeeList/>
        </div>
      </div>
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onDepartmentAdded={handleDepartmentAdded}
      />
      <DeleteDepartmentModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      />
    </section>
  );
};
