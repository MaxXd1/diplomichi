import style from './index.module.css';

type Props ={
  text: string;
}

export const AuthButton: React.FC<Props> = ({text}) => {
  return (
    <button className={style.button}>
        {text}
    </button>
  )
}