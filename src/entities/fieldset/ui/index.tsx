import { useDispatch, useSelector } from 'react-redux';
import style from './index.module.css';
import { selectDisplayMode, setDisplayMode } from '@app/store/displayModeSlice';

export const FieldSet = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(selectDisplayMode);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDisplayMode(event.target.value));
  };

  return (
    <form>
      <fieldset>
        <legend className={style.legend}>Вид отображения</legend>
        <input
          type="radio"
          name="info"
          value="Общ информация"
          className={style.fieldset_input}
          checked={selectedOption === 'Общ информация'}
          onChange={handleOptionChange}
        />
        <label>Общ информация</label> <br />
        <input
          type="radio"
          name="info"
          value="За день"
          className={style.fieldset_input}
          checked={selectedOption === 'За день'}
          onChange={handleOptionChange}
        />
        <label>За день</label><br />
        {/* <input
          type="radio"
          name="info"
          value="За месяц"
          className={style.fieldset_input}
          checked={selectedOption === 'За месяц'}
          onChange={handleOptionChange}
        />
        <label>За месяц</label><br/> */}
      </fieldset>
    </form>
  );
};
