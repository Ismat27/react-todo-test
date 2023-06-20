import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import { AnimatePresence } from "framer-motion";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Nav />
        <AnimatePresence mode="wait">
          <AllRoutes />
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}

export default App;
