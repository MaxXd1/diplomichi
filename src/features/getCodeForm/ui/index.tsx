import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useState } from "react";
import style from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const GetCodeForm = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  
  const GetCode = async () => {
    const email = sessionStorage.getItem("email");
    try {
      const response = await axios.post(`https://apiwithdb-u82g.onrender.com/forgotPassword/verifyOtp/${otp}/${email}`, {});
      return response.data;
    } catch (e: any) {
      throw e; 
    }
  };

  const handleGetCode = () => {
    toast.promise(
      GetCode(),
      {
        pending: "Проверка кода...",
        success: {
          render() {
            navigate('/login/forgot-password/recover-pass'); 
            return "Код успешно проверен.";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при проверке кода.";
          }
        }
      }
    );
  };

  return (
    <div>
      <form className={style.wrapper}>
        <Input
          type="text"
          value={otp}
          placeholder="Код восстановления"
          setValue={setOtp}
        />
      </form>
      <AuthButton text="Отправить" refetch={handleGetCode} />
    </div>
  );
};
