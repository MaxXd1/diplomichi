import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { CountrySelect } from "@shared/countrySelect/ui";
import { RoleSelect } from "@shared/roleSelect/ui";
import { useState } from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";

type Props = {
  type: string;
};

export const AuthForm: React.FC<Props> = ({ type }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  return (
    <div
      className={`${style.form_wrapper} ${
        type === "Авторизация" ? style.login : ""
      }`}
    >
      <form className={style.form_container}>
        {type === "Авторизация" ? (
          <div className={style.login_container}>
            <Input
              type="Email"
              value={email}
              placeholder="Email"
              setValue={setEmail}
              setValid={setEmailValid}
              isValidation
            />
            <Input
              type="Password"
              value={password}
              placeholder="Password"
              setValue={setPassword}
              setValid={setPasswordValid}
              isValidation
            />
          </div>
        ) : null}
        {type === "Регистрация" ? (
          <div className={style.left_column}>
            {type === "Регистрация" ? (
              <Input
                type="First Name"
                value={firstName}
                placeholder="First Name"
                setValue={setFirstName}
              />
            ) : null}
            <Input
              type="Second Name"
              value={secondName}
              placeholder="Second Name"
              setValue={setSecondName}
            />
            <Input
              type="Email"
              value={email}
              placeholder="Email"
              setValue={setEmail}
              setValid={setEmailValid}
              isValidation
            />
            {!emailValid && (
              <div className={style.validate}>Не верный email</div>
            )}
            <Input
              type="Company Name"
              value={companyName}
              placeholder="Company Name"
              setValue={setCompanyName}
            />
          </div>
        ) : null}
        {type === "Регистрация" ? (
          <div className={style.right_column}>
            <RoleSelect />
            <CountrySelect />
            <Input
              type="Password"
              value={password}
              placeholder="Password"
              setValue={setPassword}
              setValid={setPasswordValid}
              isValidation
            />
            {!passwordValid && (
              <div className={style.validate}>Пароль не подходит</div>
            )}
            <Input
              type="RepeatPassword"
              value={repeatPassword}
              placeholder="RepeatPassword"
              setValue={setRepeatPassword}
            />
            {password === repeatPassword ? (
              ""
            ) : (
              <div className={style.validate}>Пароль не совпадает</div>
            )}
          </div>
        ) : null}
      </form>
      <AuthButton />
      {type !== "Забыли пароль?" && (
        <div className={style.link_wrap}>
          {type === "Регистрация" ? (
            <span className={style.link}>
              Есть аккаунт?{" "}
              <Link to="/login" className={style.link}>
                Войти
              </Link>
            </span>
          ) : (
            <span className={style.link}>
              Нет аккаунта?{" "}
              <Link to="/registrate" className={style.link}>
                Регистрация
              </Link>
            </span>
          )}
          {type === "Регистрация" ? (
            ""
          ) : (
            <Link
              className={`${style.link} ${style.link_password}`}
              to="/login/forgot-password"
            >
              Забыли пароль?
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
