
import axios from "axios";

export const getEmployees = async (companyId: number, departmentId: number, token: string) => {
  try {
    const response = await axios.get(
      `https://apiwithdb-u82g.onrender.com/company/${companyId}/departments/${departmentId}/employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.map((data: any) => ({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      employeePhoto: data.employeePhoto ? data.employeePhoto.split("\\").pop() : "",
      login: data.login,
      country: data.country,
      phoneNumber: data.phoneNumber,
      birthDate: data.birthDate,
      position: data.position,
      hoursWorkedToday: data.hoursWorkedToday,
      hoursWorkedThisMonth: data.hoursWorkedThisMonth,
    }));
  } catch (e) {
    console.error("Error fetching employees", e);
    throw e;
  }
};
