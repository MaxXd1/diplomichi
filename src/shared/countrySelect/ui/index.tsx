import { countryOptionsData } from "@shared/constants/registration/mock";
import style from "./index.module.css";

export const CountrySelect = () => {
  return (
    <div>
      <h2 className={style.select_text}>Country</h2>
      <select name="country" id="country" className={style.select}>
        {countryOptionsData.map((country) => (
          <option key={country.label} value={country.label}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};
