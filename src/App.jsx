import Appointment from "./components/appointments/Appointment";
import { APPOINTMENT_DATA } from "./api/mock_data";
import PatientList from "./components/patients/PatientList";
import DoctorList from "./components/doctors/DoctorsList";
import BookingForm from "./components/patients/BookingForm";
import SideBar from "./components/navigation/SideBar";
import NavBar from "./components/navigation/NavBar";
import FindADoctor from "./components/pages/FindADoct/FindADoctor";
import DoctorPage from "./components/pages/DoctorPage/DoctorPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <SideBar /> */}
      {/* <DarkMode /> */}
      {/* {APPOINTMENT_DATA.map((appointment, id) => (
        <Appointment key={id} {...appointment} />
      ))} */}
      <FindADoctor />
      <DoctorList />
      <PatientList />
      <DoctorPage />
      <BookingForm />
    </div>
  );
}

export default App;
