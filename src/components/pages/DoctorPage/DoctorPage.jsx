import React from "react";
import BookingForm from "../../patients/BookingForm";
import "./DoctorPage.css";
import useSWR from "swr";
import AsyncData from "../../AsyncData";
import { getById } from "../../../api";
import DoctorCard from "../../doctors/DoctorCard";

const DoctorPage = (match) => {
  const doctorId = match.params;
  const apiUrl = `doctors/${doctorId}`;

  const { data: doctorData, error } = useSWR(apiUrl, getById);

  console.log("DoctorPage - doctorId:", doctorId);
  console.log("DoctorPage - doctorData:", doctorData);
  console.log("DoctorPage - error:", error);

  if (error) {
    return <div>Error loading doctor data</div>;
  }

  if (!doctorData) {
    return <div>Loading...</div>;
  }

  const { id: doctorIdFromData, name, about } = doctorData;

  const handleSaveBooking = (values) => {
    // Do something with values
    console.log(values);
  };

  return (
    <div className="doctor-page">
      <header className="doctor-page__header">
        <h1 className="doctor-page__title">HealthCare</h1>
      </header>
      <main className="doctor-page__main">
        <section className="doctor-page__card">
          <AsyncData loading={!doctorData} error={error}>
            <DoctorCard doctorId={doctorIdFromData} />
          </AsyncData>
        </section>
        <section className="doctor-page__about">
          <h2 className="doctor-page__about-title">About {name}</h2>
          <p className="doctor-page__about-text">{about}</p>
        </section>
        <section className="doctor-page__booking">
          <BookingForm onSaveBooking={handleSaveBooking} />
        </section>
      </main>
    </div>
  );
};

export default DoctorPage;

// const DoctorPage = ({ doctorId }) => {
//   const { data: doctor, error, isValidating } = useSWR(`doctors/${doctorId}`, getById);

//   const handleSaveBooking = (bookingData) => {
//     // handle booking save logic here
//   };

//   return (
//     <AsyncData loading={isValidating} error={error}>
//       {doctor && (
//         <div className="doctorPage">
//           <h1 className="doctorPage__title">{doctor.name}</h1>
//           <DoctorCard doctor={doctor} />
//           <div className="doctorPage__about">
//             <h2>About</h2>
//             <p>{doctor.about}</p>
//           </div>
//           <div className="doctorPage__bookingForm">
//             <BookingForm onSaveBooking={handleSaveBooking} />
//           </div>
//         </div>
//       )}
//     </AsyncData>
//   );
// };

// export default DoctorPage;
