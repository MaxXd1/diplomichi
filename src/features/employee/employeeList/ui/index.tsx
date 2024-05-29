import { GeneralInfoTable } from '@features/employee/generalInfoTable/ui';
import style from './index.module.css';
import { useAppSelector } from '@app/store/types';
import { selectDisplayMode } from '@app/store/displayModeSlice';
import { DailyInfoTable } from '@features/employee/dailyInfoTable/ui';

export const EmployeeList = () => {
  const displayMode = useAppSelector(selectDisplayMode); 
  
  let list;

  switch(displayMode){
    case "Общ информация":
      list = <GeneralInfoTable/>
      break;
    case "За день":
      list = <DailyInfoTable/>
      break;
    case "За месяц":

      break;
  }

  return (
    <div>
      <h2 className={style.title}>Сотрудники</h2>
       {list}
    </div>
  );
};
