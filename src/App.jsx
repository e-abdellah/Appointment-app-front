import Appointment from "./components/appointments/Appointment";
import { APPOINTMENT_DATA } from "./api/mock_data";
import PatientList from "./components/patients/PatientList";
import DoctorList from "./components/doctors/DoctorsList";
import BookingForm from "./components/patients/BookingForm";

function App() {
  return (
    <>
      {APPOINTMENT_DATA.map((appointment, id) => (
        <Appointment key={id} {...appointment} />
      ))}
      <PatientList />
      <DoctorList />
      {/* <BookingForm /> */}
    </>
  );
}

export default App;
