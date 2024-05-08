import { roleOptionsData } from "@shared/constants/registration/mock";
import style from "./index.module.css";
import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const RoleSelect: React.FC<Props> = ({ value, setValue }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(event.target.value); 
    };
  return (
    <div>
      <select name="Role" id="Role" className={style.select} value={value} onChange={handleChange}>
        {roleOptionsData.map((role) => (
          <option key={role.label} value={role.label}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
};
