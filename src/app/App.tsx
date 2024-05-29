import { Route, Routes } from "react-router-dom";
import "./reset.css";
import { Main } from "@pages/main/ui";
import { Login } from "@pages/login/ui";
import { ForgotPassword } from "@pages/forgotPassword/ui";
import { Registration } from "@pages/registration/ui";
import { GetCode } from "@pages/getCode/ui";
import { PasswordRecovery } from "@pages/passwordRecovery/ui";
import {  CreateCompany } from "@pages/createCompany/ui";

function App() {
  return (
      <Routes>
        <Route path="/registrate" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/forgot-password/get-code" element={<GetCode />} />
        <Route
          path="/login/forgot-password/recover-pass"
          element={<PasswordRecovery />}
        />
        <Route path="/createCompany" element={<CreateCompany/>} />
        <Route path="/main" element={<Main />} />
      </Routes>
  );
}

export default App;
