// import React, { useState, useEffect } from "react";
// import DoctorCard from "../doctors/DoctorCard";
// import { DOCTOR_DATA } from "../../api/mock_data";
// import "./FindADoctor.css";
// import DoctorList from "../doctors/DoctorsList";
// import Footer from "../pages/footer/Footer";

// const FindADoctor = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   useEffect(() => {
//     if (searchInput.length >= 3) {
//       const matchingDoctors = DOCTOR_DATA.filter(
//         (doctor) =>
//           doctor.doctor.toLowerCase().includes(searchInput.toLowerCase()) ||
//           doctor.speciality.toLowerCase().includes(searchInput.toLowerCase())
//       );

//       setSearchResults(matchingDoctors);
//       setHasSearched(true);
//     } else if (searchInput.length < 3) {
//       setSearchResults([]);
//       setHasSearched(false);
//     }
//   }, [searchInput]);

//   return (
//     <>
//       <div className="findADoctor">
//         <h1 className="findADoctor__title">Find a Doctor</h1>
//         <div className="findADoctor__searchBar">
//           <input
//             type="text"
//             placeholder="Search by doctor name or speciality"
//             className="findADoctor__searchInput"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//           />
//         </div>
//         <div className="findADoctor__results">
//           {hasSearched && searchResults.length === 0 ? (
//             <div className="alert alert-info">No doctor found</div>
//           ) : (
//             searchResults.map((doctor) => (
//               <DoctorCard key={doctor.id} doctor={doctor} />
//             ))
//           )}
//         </div>
//       </div>
//       <div>
//         <DoctorList />
//       </div>
//       <footer className="footer">
//         <Footer />
//       </footer>
//     </>
//   );
// };

// export default FindADoctor;

import React, { useState, useEffect } from "react";
import DoctorCard from "../doctors/DoctorCard";
import useSWR from "swr";
import { getAll } from "../../api";
import AsyncData from "../AsyncData";
import DoctorList from "../doctors/DoctorsList";
import "./FindADoctor.css";
import Footer from "../pages/footer/Footer";

const FindADoctor = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBy, setSearchBy] = useState('name');
  const [hasSearched, setHasSearched] = useState(false);

  const { data: searchResults = [], error } = useSWR(
    searchInput.length >= 3
      ? `search?search=${searchInput}&searchBy=${searchBy || ''}`
      : null,
    getAll
  );

  useEffect(() => {
    setHasSearched(searchInput.length >= 3);
  }, [searchInput]);
  console.log("searchResults", searchResults);

  return (
    <>
      <div className="findADoctor">
        <h1 className="findADoctor__title">Find a Doctor</h1>
        <div className="findADoctor__searchBar">
          <input
            type="text"
            placeholder="Search by doctor name or speciality"
            className="findADoctor__searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="findADoctor__results">
          <AsyncData loading={!searchResults && !error} error={error}>
            {hasSearched && searchResults.length === 0 ? (
              <div className="alert alert-info">No doctor found</div>
            ) : (
              searchResults.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </AsyncData>
        </div>
      </div>
      <div className="findADoctor__list">
        <DoctorList />
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};

export default FindADoctor;
