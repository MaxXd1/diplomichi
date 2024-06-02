import { AppDispatch } from "@app/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompany = async (dispatch: AppDispatch, dispatcher: ActionCreatorWithPayload<any, any>, role: any) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get('https://apiwithdb-u82g.onrender.com/company', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const company = role === 'ADMIN' ? response.data.data[0] : response.data.data;

    let formattedCompFoundationDate = '';
    if (company.compFoundationDate) {
      const date = new Date(company.compFoundationDate);
      if (!isNaN(date.getTime())) {
        formattedCompFoundationDate = date.toISOString();
      }
    }

    const formattedCompany = {
      ...company,
      compFoundationDate: formattedCompFoundationDate,
    };

    dispatch(dispatcher(formattedCompany));
  } catch (e) {
    console.error("Error fetching company", e);
  }
};
