import React, { useState, useEffect } from "react";
import useSWR from "swr";
import DoctorCard from "../../doctors/DoctorCard";
import AsyncData from "../../AsyncData";
import DoctorList from "../../doctors/DoctorsList";
import "./FindADoctor.css";
import { getAll } from "../../../api/index";

const FindADoctor = () => {
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [inputError, setInputError] = useState(null);

  const { data: doctors, error } = useSWR("doctors", getAll);
  console.log("Doctors:", doctors);

  const handleSearch = () => {
    if (searchInput.trim().length === 0 || searchInput.length < 3) {
      setInputError("Input is blank or too short (minimum 3 characters).");
      setFilteredResults([]);
      setHasSearched(true);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredResults(filtered);
    setHasSearched(true);
    setInputError(null);
  };

  useEffect(() => {
    if (searchInput.length >= 3) {
      handleSearch();
    } else {
      setHasSearched(false);
      setFilteredResults([]);
    }
  }, [searchInput, doctors]);

  return (
    <>
      <div className="findADoctor">
        <h1 className="findADoctor__title">Find a Doctor</h1>
        <div className="findADoctor__searchBar">
          <input
            type="search"
            placeholder="Search by doctor name or speciality"
            className="findADoctor__searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="findADoctor__results">
          <AsyncData loading={!doctors} error={error}>
            {hasSearched && filteredResults.length === 0 ? (
              <div className="alert alert-info">No doctor found</div>
            ) : (
              filteredResults.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </AsyncData>
        </div>
      </div>
      <div className="findADoctor__list">
        <DoctorList />
      </div>
    </>
  );
};

export default FindADoctor;

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
//           doctor.name.toLowerCase().includes(searchInput.toLowerCase()) ||
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
