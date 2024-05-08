import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { CountrySelect } from "@shared/countrySelect/ui";
import { RoleSelect } from "@shared/roleSelect/ui";
import { useState } from "react";
import { AuthButton } from "@shared/authButton/ui";
import { Link, } from "react-router-dom";
import { useQuery } from "react-query";


export const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [role, setRole] = useState("");
  const [country, setCountry]= useState("");

  const Registrate =() => {
    fetch("https://apiwithdb-u82g.onrender.com/register", {
    method: "post",
    headers: {
    'Content-Type': 'application/json'
    },
 
    body: JSON.stringify({
    firstName,
    lastName,
    login,
    country,
    role,
    password,
    })
})
  }
  const { data , refetch } = useQuery('repoData',Registrate,{
    refetchOnWindowFocus: false,
    enabled: false
  }
  )
  console.log(data);

  return (
    <div className={style.form_wrapper}>
      <form className={style.form_container}>
        <div className={style.left_column}>
          <Input
            type="First Name"
            value={firstName}
            placeholder="First Name"
            setValue={setFirstName}
          />
          <Input
            type="Second Name"
            value={lastName}
            placeholder="Second Name"
            setValue={setLastName}
          />
          <Input
            type="Email"
            value={login}
            placeholder="Email"
            setValue={setLogin}
            setValid={setEmailValid}
            isValidation
          />
          {!emailValid && <div className={style.validate}>Не верный email</div>}
          <Input
            type="Company Name"
            value={companyName}
            placeholder="Company Name"
            setValue={setCompanyName}
          />
        </div>
        <div className={style.right_column}>
          <RoleSelect value={role} setValue={setRole}/>
          <CountrySelect value={country} setValue={setCountry}/>
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
            <div className={style.validate}>Пароли не совпадают</div>
          )}
        </div>
      </form>
      <AuthButton text="Войти" refetch={refetch}  />
      <div>
        <span className={style.link}>У вас есть учетная запись? </span>
        <Link to="/login" className={`${style.link} ${style.link_password}`}>
          Войти
        </Link>
      </div>
    </div>
  );
};
