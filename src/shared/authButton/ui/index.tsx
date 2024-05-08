
import style from './index.module.css';

type Props ={
  text: string;
  refetch?:any;
}

export const AuthButton: React.FC<Props> = ({text,refetch}) => {

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

   refetch();
  }

  return (
    <button className={style.button} onClick={(e) =>{handleButtonClick(e)}}>
        {text}
    </button>
  )
}