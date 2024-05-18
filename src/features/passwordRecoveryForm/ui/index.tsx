import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { AuthButton } from "@shared/authButton/ui";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { setUser, userSelector } from "@app/store/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const PasswordRecoveryForm = () => {
  const dispath = useAppDispatch();

  const ChangePass =(value: any)=>{
    dispath(setUser(value));
  }
  const User = useAppSelector(userSelector);
 

  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const PasswordRecovery = async () => {
    const { password,repeatPassword } = User;
    try{
      const response = await axios.post(`https://apiwithdb-u82g.onrender.com/forgotPassword/changePassword/${email}`,{
        password,
        repeatPassword,
    }
  );
  return response.data;
    } catch (e:any){
      throw e;
    }
  };
  
  const handlePassRecovery = () => {
    toast.promise(
      PasswordRecovery(),
      {
        pending: "Смена пароля...",
        success: {
          render() {
            navigate('/login'); 
            return "Пароль сохранён.";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка при сохранении пароля.";
          }
        }
      }
    );
  }

  return (
    <div>
      <form className={style.wrapper}>
        <Input
          type="password"
          value={User.password}
          placeholder="Новый пароль"
          setValue={(newValue) =>
            ChangePass({ ...User, password: newValue })}
        />
        <Input
          type="password"
          value={User.repeatPassword}
          placeholder="Подтвердите пароль"
          setValue={(newValue) =>
            ChangePass({ ...User, repeatPassword: newValue })}
        />
      </form>
      <AuthButton text="Отправить" refetch={handlePassRecovery} />
    </div>
  );
};
