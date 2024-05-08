import { Input } from "@shared/authInput/ui";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import { AuthButton } from "@shared/authButton/ui";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const PasswordRecoveryForm = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const PasswordRecovery = () => {
    fetch(
      `https://apiwithdb-u82g.onrender.com/forgotPassword/changePassword/${email}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          repeatPassword,
        }),
      }
    );
  };
  const { refetch, isSuccess } = useQuery("changePassword", PasswordRecovery, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(3);
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div>
      <form className={style.wrapper}>
        <Input
          type="password"
          value={password}
          placeholder="Новый пароль"
          setValue={setPassword}
        />
        <Input
          type="password"
          value={repeatPassword}
          placeholder="Подтвердите пароль"
          setValue={setRepeatPassword}
        />
      </form>
      <AuthButton text="Отправить" refetch={refetch} />
    </div>
  );
};
