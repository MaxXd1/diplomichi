import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { CountrySelect } from "@shared/countrySelect/ui";
import { useEffect, useState } from "react";
import { AuthButton } from "@shared/authButton/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import {
  MessageSelector,
  StatusCodeSelector,
  setError,
  setUser,
  userSelector,
} from "@app/store/authSlice";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const RegistrationForm = () => {
  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const statusCode = useAppSelector(StatusCodeSelector);
  const errorMessage = useAppSelector(MessageSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateUser = (value: any) => {
    dispatch(setUser(value));
  };
  const User = useAppSelector(userSelector);

  const registrate = async () => {
    const { repeatPassword, ...usefulData } = User;
    try {
      const response = await axios.post(
        "https://apiwithdb-u82g.onrender.com/register",
        {
          ...usefulData,
        }
      );
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

  const handleRegistration = () => {
    toast.promise(
      registrate(),
      {
        pending: "Регистрация...",
        success: {
          render() {
            navigate('/login');
            return "Вы успешно зарегистрированы!";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при регистрации.";
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
    <div className={style.form_wrapper}>
      <form className={style.form_container}>
        <div className={style.left_column}>
          <Input
            type="First Name"
            value={User.firstName}
            placeholder="First Name"
            setValue={(newValue) =>
              updateUser({ ...User, firstName: newValue })
            }
          />
          <Input
            type="Second Name"
            value={User.lastName}
            placeholder="Second Name"
            setValue={(newValue) =>
              updateUser({ ...User, lastName: newValue })
            }
          />
          <Input
            type="login"
            value={User.login}
            placeholder="Email"
            setValue={(newValue) => updateUser({ ...User, login: newValue })}
            setValid={setEmailValid}
            isValidation
          />
          {!emailValid && <div className={style.validate}>Не верный email</div>}
        </div>
        <div className={style.right_column}>
          <CountrySelect
            value={User.country}
            setValue={(newValue) => updateUser({ ...User, country: newValue })}
          />
          <Input
            type="Password"
            value={User.password}
            placeholder="Password"
            setValue={(newValue) =>
              updateUser({ ...User, password: newValue })
            }
            setValid={setPasswordValid}
            isValidation
          />
          {!passwordValid && (
            <div className={style.validate}> Пароль должен быть не менее 8 символов, содержать хотя бы одну заглавную букву и одну цифру</div>
          )}
          <Input
            type="RepeatPassword"
            value={User.repeatPassword}
            placeholder="RepeatPassword"
            setValue={(newValue) =>
              updateUser({ ...User, repeatPassword: newValue })
            }
          />
          {User.password === User.repeatPassword ? (
            ""
          ) : (
            <div className={style.validate}>Пароли не совпадают</div>
          )}
        </div>
      </form>
      <AuthButton text="Войти" refetch={handleRegistration} />
      <div>
        <span className={style.link}>У вас есть учетная запись? </span>
        <Link to="/login" className={`${style.link} ${style.link_password}`}>
          Войти
        </Link>
      </div>
    </div>
  );
};
