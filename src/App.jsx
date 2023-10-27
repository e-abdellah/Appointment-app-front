import Appointment from "./components/appointments/Appointment";
import { APPOINTMENT_DATA } from "./api/mock_data";
import PatientList from "./components/patients/PatientList";
import DoctorList from "./components/doctors/DoctorsList";
import BookingForm from "./components/patients/BookingForm";
import SideBar from "./components/SideBar";
import DarkMode from "./components/DarkMode";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <SideBar />
      {/* <DarkMode /> */}
      {APPOINTMENT_DATA.map((appointment, id) => (
        <Appointment key={id} {...appointment} />
      ))}
      <PatientList />
      <DoctorList />
      <BookingForm />
    </>
  );
}

export default App;
