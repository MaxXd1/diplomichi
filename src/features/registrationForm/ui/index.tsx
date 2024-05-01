import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { CountrySelect } from "@shared/countrySelect/ui";
import { RoleSelect } from "@shared/roleSelect/ui";
import { useState } from "react";
import { AuthButton } from "@shared/authButton/ui";
import { Link } from "react-router-dom";

export const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  return (
        <div className={style.form_wrapper}>
          <form className={style.form_container}>
        <div className={style.left_column}>
          <Input
            type="First Name"
            value={firstName}
            placeholder="First Name"
            setValue={setFirstName} />
          <Input
            type="Second Name"
            value={secondName}
            placeholder="Second Name"
            setValue={setSecondName} />
          <Input
            type="Email"
            value={email}
            placeholder="Email"
            setValue={setEmail}
            setValid={setEmailValid}
            isValidation />
          {!emailValid && (
            <div className={style.validate}>Не верный email</div>
          )}
          <Input
            type="Company Name"
            value={companyName}
            placeholder="Company Name"
            setValue={setCompanyName} />
        </div>
        <div className={style.right_column}>
          <RoleSelect />
          <CountrySelect />
          <Input
            type="Password"
            value={password}
            placeholder="Password"
            setValue={setPassword}
            setValid={setPasswordValid}
            isValidation />
          {!passwordValid && (
            <div className={style.validate}>Пароль не подходит</div>
          )}
          <Input
            type="RepeatPassword"
            value={repeatPassword}
            placeholder="RepeatPassword"
            setValue={setRepeatPassword} />
          {password === repeatPassword ? (
            ""
          ) : (
            <div className={style.validate}>Пароль не совпадает</div>
          )}
      </div>
    </form>
    <AuthButton text="Войти" />
    <span className={style.link}>
              Есть аккаунт?{" "}
              <Link to="/login" className={`${style.link} ${style.link_password}`}>
                Войти
              </Link>
            </span>
    </div>
  )
}
