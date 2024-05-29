import style from './index.module.css';

type Props = {
  text: string;
  refetch?: any;
  disabled?: boolean;
  color?: string;
}

export const AuthButton: React.FC<Props> = ({ text, refetch, disabled, color }) => {

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!disabled && refetch) {
      refetch();
    }
  }

  return (
    <button
      className={style.button}
      onClick={handleButtonClick}
      disabled={disabled}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
}
