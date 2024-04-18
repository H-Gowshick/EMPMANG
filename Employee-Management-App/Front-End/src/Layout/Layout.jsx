import SignUpPage from "../Pages/Signup";
import LoginPage from "../Pages/Login";
import EmployeeList from "../Pages/Admin/EmployeeList"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Admin/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/employeeList" element={<EmployeeList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
