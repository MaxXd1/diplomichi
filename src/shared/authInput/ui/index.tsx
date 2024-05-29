import { Props } from "../model/type";
import style from "./index.module.css";
import { validate } from "@shared/util/validation";
import React from "react";

export const Input = ({ type, value, placeholder, setValue, setValid, isValidation }: Props<string>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (isValidation) {
      validate(newValue, type, setValid);
    }
  };

  return (
    <div>
      <input
        type={
          type === "Password" || type === "RepeatPassword"
            ? "password"
            : type === "date"
            ? "date"
            : type === "file"
            ? "file"
            : "text"
        }
        placeholder={placeholder}
        className={style.input}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
