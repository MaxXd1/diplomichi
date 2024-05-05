import { useNavigate } from 'react-router-dom';
import style from './index.module.css';

type Props ={
  text: string;
  to: string;
}

export const AuthButton: React.FC<Props> = ({text,to}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(to);
  }

  return (
    <button className={style.button} onClick={handleButtonClick}>
        {text}
    </button>
  )
}