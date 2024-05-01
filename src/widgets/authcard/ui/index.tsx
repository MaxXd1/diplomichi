import { AuthForm } from "@features/authForm/ui";
import { RegistrationForm } from "@features/registrationForm/ui";
import style from "./index.module.css";
import { ForgotPasswordForm } from "@features/forgotPasswordForm/ui";

type Props = {
  type: string;
}

export const AuthCard: React.FC<Props> = ({type}) => {
  let formComponent;
  
  switch (type) {
    case "Авторизация":
      formComponent = <AuthForm />;
      break;
    case "Регистрация":
      formComponent = <RegistrationForm />;
      break;
    case "Забыли пароль?":
      formComponent = <ForgotPasswordForm />;
      break;
    default:
      formComponent = null;
  }

  return (
    <section className={style.wrapper}>
      <img src="/src/assets/logo.png" alt="" className={style.logo_img}/>
      <div className={style.container}>
        <div className={style.card}>
          <h2 className={style.title}>{type}</h2>
          {formComponent}
        </div>
      </div>
    </section>
  );
};
