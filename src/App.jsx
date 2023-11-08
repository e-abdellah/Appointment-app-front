import React from 'react';
import Appointment from "./components/appointments/Appointment";
import { APPOINTMENT_DATA } from "./api/mock_data";
import PatientList from "./components/patients/PatientList";
import DoctorList from "./components/doctors/DoctorsList";
import BookingForm from "./components/patients/BookingForm";
import SideBar from "./components/navigation/SideBar";
import NavBar from "./components/navigation/NavBar";
import FindADoctor from "./components/pages/FindADoct/FindADoctor";
import DoctorPage from "./components/pages/DoctorPage/DoctorPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        {/* <SideBar /> */}
        {/* <DarkMode /> */}
        {/* {APPOINTMENT_DATA.map((appointment, id) => (
          <Appointment key={id} {...appointment} />
        ))} */}
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/findADoctor" element={<FindADoctor />} />
          <Route path="/doctor/:id" element={<DoctorPage />} />
        </Routes> */}
        <HomePage />
        <FindADoctor />
        {/* <DoctorPage /> */}
        <DoctorList />
        <BookingForm />
      </Router>
    </div>
  );
}

export default App;
