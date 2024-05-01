import { Route, Routes } from "react-router-dom";
import "./reset.css";
import { Main } from "@pages/main/ui";
import { Login } from "@pages/login/ui";
import { ForgotPassword } from "@pages/forgotPassword/ui";
import { Registration } from "@pages/registration/ui";

function App() {
  return (
    <Routes>
      <Route path="/registrate" element={<Registration />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/login/forgot-password" element={<ForgotPassword />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
