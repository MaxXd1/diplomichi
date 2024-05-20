import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { setUser, userSelector } from "@app/store/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();

  const User = useAppSelector(userSelector);
  
  const ForgotPassLogin = (value: any) => {
    dispatch(setUser(value));
  };
  
  const ForgotPass = async () => {
    const { login } = User; 
    try {
      const response = await axios.post(`https://apiwithdb-u82g.onrender.com/forgotPassword/verifyMail/${login}`);
      return response.data;
    } catch (e: any) {
      throw e; 
    }
  };
  
  const handleForgotPassword = () => {
    toast.promise(
      ForgotPass(),
      {
        pending: "Отправка запроса...",
        success: {
          render() {
            sessionStorage.setItem("email", User.login); 
            navigate('/login/forgot-password/get-code'); 
            return "Код выслан на ваш email.";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при отправке запроса.";
          }
        }
      }
    );
  };

  return (
    <form className={style.wrapper}>
      <Input
        type="Email"
        value={User.login}
        placeholder="Email"
        setValue={(newValue) => ForgotPassLogin({ ...User, login: newValue })}
        setValid={setEmailValid}
        isValidation
      />
      {!emailValid && <div className={style.validate}>Неверный email</div>}
      <AuthButton text="Получить код" refetch={handleForgotPassword} />
    </form>
  );
};
