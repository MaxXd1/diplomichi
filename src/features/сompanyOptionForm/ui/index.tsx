import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { useState } from "react";

export const CreateCompanyForm = () => {
  const [compName, setCompName] = useState("");
  const [compAddress, setCompAddress] = useState("");
  const [compLegalAddress, setCompLegalAddress] = useState("");
  const [compFoundationDate, setCompFoundationDate] = useState("");
  const [compWebsite, setCompWebsite] = useState("");
  const [compFieldOfActivity, setCompFieldOfActivity] = useState("");
  const [compRegistrationNumber, setCompRegistrationNumber] = useState("");
  const [compVAT, setCompVAT] = useState("");
  
//   const dateFormat = "T00:00:00Z";
  
  const handleSubmit = () => {
    const companyData = {
      id: 0,
      compName,
      compAddress,
      compLegalAddress,
      compFoundationDate: new Date(compFoundationDate).toISOString(),
      compWebsite,
      compFieldOfActivity,
      compRegistrationNumber,
      compVAT,
    };

    console.log(companyData);
  };

  return (
    <div className={style.form_wrapper}>
      <form className={style.form_container}>
        <div className={style.left_column}>
          <Input
            type="text"
            value={compName}
            placeholder="Название"
            setValue={setCompName}
          />
          <Input
            type="text"
            value={compAddress}
            placeholder="Фактический адрес"
            setValue={setCompAddress}
          />
          <Input
            type="text"
            value={compLegalAddress}
            placeholder="Юридический адрес"
            setValue={setCompLegalAddress}
          />
          <Input
            type="date"
            value={compFoundationDate}
            placeholder="Дата основания"
            setValue={setCompFoundationDate}
          />
        </div>
        <div className={style.right_column}>
          <Input
            type="text"
            value={compWebsite}
            placeholder="Веб-сайт"
            setValue={setCompWebsite}
          />
          <Input
            type="text"
            value={compFieldOfActivity}
            placeholder="Сфера деятельности"
            setValue={setCompFieldOfActivity}
          />
          <Input
            type="text"
            value={compRegistrationNumber}
            placeholder="Регистрационный номер"
            setValue={setCompRegistrationNumber}
          />
          <Input
            type="text"
            value={compVAT}
            placeholder="Номер НДС"
            setValue={setCompVAT}
          />
        </div>
      </form>
      <AuthButton text="Создать" refetch={handleSubmit} />
    </div>
  );
};
