import { AuthButton } from '@shared/authButton/ui'
import { Input } from '@shared/authInput/ui'
import { useState } from 'react';
import style from "./index.module.css";

export const GetCodeForm = () => {

    const [code, setCode] = useState(''); 
  return (
    <div>
        <form className={style.wrapper}>
            <Input
            type="text"
            value={code}
            placeholder="Код восстановления"
            setValue={setCode}
            />
        </form>
        <AuthButton text="Отправить" to="/login/forgot-password/recover-pass"/>
    </div>
    
  )
}
