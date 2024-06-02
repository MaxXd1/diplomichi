import { AuthButton } from "@shared/authButton/ui";
import { Input } from "@shared/authInput/ui";
import style from "./index.module.css";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@app/store/types";
import { MessageSelector, setError } from "@app/store/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export const CreateCompanyForm = () => {
  // useAuth();
  const [compName, setCompName] = useState("");
  const [compAddress, setCompAddress] = useState("");
  const [compLegalAddress, setCompLegalAddress] = useState("");
  const [compFoundationDate, setCompFoundationDate] = useState("");
  const [compWebsite, setCompWebsite] = useState("");
  const [compFieldOfActivity, setCompFieldOfActivity] = useState("");
  const [compRegistrationNumber, setCompRegistrationNumber] = useState("");
  const [compVAT, setCompVAT] = useState("");

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(MessageSelector);
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString();
  };

  const companyData = {
    compName,
    compAddress,
    compLegalAddress,
    compFoundationDate: formatDate(compFoundationDate),
    compWebsite,
    compFieldOfActivity,
    compRegistrationNumber,
    compVAT,
  };

  const createCompany = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post("https://apiwithdb-u82g.onrender.com/company",
       companyData,
       {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
      );
      if (response.data.status) {
        dispatch(setError(response.data));
      }
      return response.data;
    } catch (e: any) {
      dispatch(setError({
        statusCode: e.response.data.status,
        message: e.response.data.error,
      }));
      console.log(e);
      throw e;
    }
  };

  const handleSubmit = () => {
    toast.promise(
      createCompany(),
      {
        pending: "Создание...",
        success: {
          render() {
            navigate('/main');
            return "Компания создана";
          }
        },
        error: {
          render({ data }) {
            const errorResponse = data as { response: { data: { error: string } } };
            return errorResponse.response.data.error || "Произошла ошибка.";
          }
        }
      }
    );
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
