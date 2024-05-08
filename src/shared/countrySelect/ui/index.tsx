import { Dispatch, SetStateAction } from 'react';
import { countryOptionsData } from "@shared/constants/registration/mock";
import style from "./index.module.css";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const CountrySelect: React.FC<Props> = ({ value, setValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value); 
  };

  return (
    <div>
      <select name="country" id="country" className={style.select} value={value} onChange={handleChange}>
        {countryOptionsData.map((country) => (
          <option key={country.label} value={country.label}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};
