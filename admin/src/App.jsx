import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import Doctorslist from "./pages/Admin/Doctorslist";

const App = () => {

  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div>
      <Navbar/>
      <div className="flex items-start">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointments" element={<AllAppointment/>}/>
          <Route path="/add-doctor" element={<AddDoctor/>}/>
          <Route path="/doctor-list" element={<Doctorslist/>}/>
        </Routes>
      </div>
      <ToastContainer/>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App