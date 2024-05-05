import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui"
import { useState } from "react";
import style from "./index.module.css";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");

  return (
   <form className={style.wrapper} >
    <Input
        type="Email"
        value={email}
        placeholder="Email"
        setValue={setEmail}
            />
    <AuthButton text="Получить код" to="/login/forgot-password/get-code" />
   </form>
  )
}
