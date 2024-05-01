import { AuthForm } from "@features/authForm/ui";
import style from "./index.module.css";

type Props = {
  type: string;
}
export const AuthCard: React.FC<Props> = ({type}) => {
  return (
    <section className={style.wrapper}>
      <div className={style.container}>
        <div className={style.card}>
          <h2 className={style.title}>{type}</h2>
          <AuthForm type={type}/>
        </div>
      </div>
    </section>
  );
};
