import { Props } from "../model/type";
import style from "./index.module.css";
import { validate } from "@shared/util/validation";

export const Input: React.FC<Props> = ({ type,value,placeholder,setValue,setValid,isValidation }) => {

  const handleChange=((e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value)
    if(isValidation){
      validate(value, type, setValid);
    }
  })

  return (
    <div>
      <h2 className={style.input_text}>{type}</h2>
      <input
        type="text"
        placeholder={placeholder}
        className={style.input}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
