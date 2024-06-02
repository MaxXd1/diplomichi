import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useEffect } from "react";
import style from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { setError, setUser, userSelector, MessageSelector, StatusCodeSelector, userRole } from "@app/store/authSlice";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { getCompany } from "@pages/main/models/getCompany";
import { companyInfoSelector, setCompanyInfo } from "@app/store/companyInfo";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const User = useAppSelector(userSelector);
  const errorMessage = useAppSelector(MessageSelector);
  const statusCode = useAppSelector(StatusCodeSelector);
  const role = useAppSelector(userRole);
  const company = useAppSelector(companyInfoSelector);
  const companyId = company.id;
  const LoginUser = (value: any) => {
    dispatch(setUser(value));
  }



  
  const Login = async () => {
    const { login, password } = User;
    try {
      const response = await axios.post("https://apiwithdb-u82g.onrender.com/login", {
        login,
        password,
      });
      console.log(response.data);
      if (!response.data.status) {
        dispatch(setUser(response.data));
      } 

      if (response.data.status) {
        dispatch(setError(response.data));
      }
      return response.data;
    } catch (e: any) {
      dispatch(setError({
        statusCode: e.response.data.status,
        message: e.response.data.error,
      }));
      throw e; 
    }
  };

  const handleLogin = () => {
    toast.promise(
      Login(),
      {
        pending: "Вход...",
        success: {
          render({ data }) {
            getCompany(dispatch, setCompanyInfo,role);
            const token = data.token; 
            localStorage.setItem('token', token);
            {role === "USER" || companyId !== 0 ? navigate('/createCompany') : navigate('/main')}
            return "Вы успешно вошли в систему!";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при входе.";
          }
        }
      }
    );
  };

  useEffect(() => {
    if (statusCode) {
      toast.error(`${errorMessage}`);
    }
    dispatch(setError({
      statusCode: null,
      message: "",
    }));
  }, [statusCode, errorMessage]);

  return (
    <div className={`${style.form_wrapper} ${style.login}`}>
      <form className={style.form_container}>
        <div className={style.login_container}>
          <Input
            type="Email"
            value={User.login}
            placeholder="Email"
            setValue={(newValue) => LoginUser({ ...User, login: newValue })}
          />
          <Input
            type="Password"
            value={User.password}
            placeholder="Password"
            setValue={(newValue) => LoginUser({ ...User, password: newValue })}
          />
        </div>
      </form>
      <AuthButton text="Войти" refetch={handleLogin} />
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
