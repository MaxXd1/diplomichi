import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';

export const GetCodeForm = () => {
  const [otp, setOtp] = useState("");
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  
  const GetCode = () => {
    fetch(
      `https://apiwithdb-u82g.onrender.com/forgotPassword/verifyOtp/${otp}/${email}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const { refetch, isSuccess } = useQuery("verifyOtp", GetCode, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(2);
      navigate("/login/forgot-password/recover-pass");
    }
  }, [isSuccess]);

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
      <AuthButton text="Отправить" refetch={refetch} />
    </div>
  );
};
