import { Route, Routes } from "react-router-dom";
import "./reset.css";
import { Main } from "@pages/main/ui";
import { Login } from "@pages/login/ui";
import { ForgotPassword } from "@pages/forgotPassword/ui";
import { Registration } from "@pages/registration/ui";
import { GetCode } from "@pages/getCode/ui";
import { PasswordRecovery } from "@pages/passwordRecovery/ui";
import { QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/registrate" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/forgot-password/get-code" element={<GetCode />} />
        <Route
          path="/login/forgot-password/recover-pass"
          element={<PasswordRecovery />}
        />
        <Route path="/main" element={<Main />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
