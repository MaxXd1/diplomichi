import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from '@app/store'
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
    <ToastContainer 
    position="bottom-center"
    autoClose={5000}
    limit={4}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover 
    />
  </BrowserRouter>
  </Provider>
);
