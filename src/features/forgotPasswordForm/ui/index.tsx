import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import { useEffect, useState } from "react";
import style from "./index.module.css";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate();

  const ForgotPass = () => {
      fetch(
        `https://apiwithdb-u82g.onrender.com/forgotPassword/verifyMail/${email}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
  };
  const { refetch, isSuccess } = useQuery("verifyMail", ForgotPass, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      console.log(1);
      sessionStorage.setItem("email", email);
      navigate("/login/forgot-password/get-code");
    }
  }, [isSuccess]);

  return (
    <form className={style.wrapper}>
      <Input
        type="Email"
        value={email}
        placeholder="Email"
        setValue={setEmail}
        setValid={setEmailValid}
        isValidation
      />
      {!emailValid && <div className={style.validate}>Не верный email</div>}
      <AuthButton text="Получить код" refetch={refetch} />
    </form>
  );
};
