import { Input } from "@shared/authInput/ui";
import { useState } from "react";
import style from "./index.module.css";
import { AuthButton } from "@shared/authButton/ui";

export const PasswordRecoveryForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <form className={style.wrapper}>
        <Input
          type="password"
          value={password}
          placeholder="Новый пароль"
          setValue={setPassword}
        />
        <Input
          type="password"
          value={confirmPassword}
          placeholder="Подтвердите пароль"
          setValue={setConfirmPassword}
        />
      </form>
      <AuthButton text="Отправить" to="/login" />
    </div>
  );
};
