
import axios from "axios";

export const getDepartments = async (companyId: number, token: string | null) => {
  try {
    const response = await axios.get(`https://apiwithdb-u82g.onrender.com/company/${companyId}/departments`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data.map((data: any) => ({
      id: data.id,
      name: data.name,
    }));
  } catch (e) {
    console.error("Error fetching departments", e);
    throw e;
  }
};
