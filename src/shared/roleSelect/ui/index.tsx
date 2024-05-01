import { roleOptionsData } from "@shared/constants/registration/mock";
import style from "./index.module.css";

export const RoleSelect = () => {
  return (
    <div>
      <h2 className={style.select_text}>Role</h2>
      <select name="Role" id="Role" className={style.select}>
        {roleOptionsData.map((role) => (
          <option key={role.label} value={role.label}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
};
