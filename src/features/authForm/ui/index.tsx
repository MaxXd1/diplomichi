import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
// type Privet ={
//   token: string;
// }
export const AuthForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const Login =() => {
   fetch("https://apiwithdb-u82g.onrender.com/login", {
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          login,
          password,
      })
  });
}
  const { data , refetch } = useQuery('repoData',Login,{
    refetchOnWindowFocus: false,
    enabled: false
  }
  )
  console.log(data);
  useEffect(() =>{
    if (data){
      localStorage.setItem('token',data?.token)
    }
  },[data]);

  return (
    <div className={`${style.form_wrapper} ${style.login}`}>
      <form className={style.form_container}>
        <div className={style.login_container}>
          <Input
            type="Email"
            value={login}
            placeholder="Email"
            setValue={setLogin}
          />
          <Input
            type="Password"
            value={password}
            placeholder="Password"
            setValue={setPassword}
          />
        </div>
      </form>
      <AuthButton text="Войти" refetch={refetch}/>
      <div className={style.link_wrap}>
        <span className={style.link}>
          Нет аккаунта{" "}
          <Link
            to="/registrate"
            className={`${style.link} ${style.link_password}`}
          >
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
