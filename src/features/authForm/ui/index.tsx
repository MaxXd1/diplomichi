import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useState } from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className={`${style.form_wrapper} ${style.login}`}>
      <form className={style.form_container}>
          <div className={style.login_container}>
            <Input
              type="Email"
              value={email}
              placeholder="Email"
              setValue={setEmail}
            />
            <Input
              type="Password"
              value={password}
              placeholder="Password"
              setValue={setPassword}
            />
          </div>
      </form>
      <AuthButton text="Войти" />
      <div className={style.link_wrap}>
      <span className={style.link}>
              Нет аккаунта?{" "}
              <Link to="/registrate" className={`${style.link} ${style.link_password}`}>
                Регистрация
              </Link>
            </span>
            <Link
              className={`${style.link} ${style.link_password}`}
              to="/login/forgot-password"
            >
              Забыли пароль?
            </Link>
      </div>   
        </div>
  );
};
