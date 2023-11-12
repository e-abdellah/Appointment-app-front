import React, { useState, useEffect } from "react";
import DoctorCard from "../doctors/DoctorCard";
import { DOCTOR_DATA } from "../../api/mock_data";
import "./FindADoctor.css";
import DoctorList from "../doctors/DoctorsList";

const FindADoctor = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchInput.length >= 3) {
      const matchingDoctors = DOCTOR_DATA.filter(
        (doctor) =>
          doctor.doctor.toLowerCase().includes(searchInput.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchInput.toLowerCase())
      );

      setSearchResults(matchingDoctors);
      setHasSearched(true);
    } else if (searchInput.length < 3) {
      setSearchResults([]);
      setHasSearched(false);
    }
  }, [searchInput]);

  return (
    <>
      <div className="findADoctor">
        <h1 className="findADoctor__title">Find a Doctor</h1>
        <div className="findADoctor__searchBar">
          <input
            type="text"
            placeholder="Search by doctor name or specialty"
            className="findADoctor__searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="findADoctor__results">
          {hasSearched && searchResults.length === 0 ? (
            <div className="alert alert-info">No doctor found</div>
          ) : (
            searchResults.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          )}
        </div>
      </div>
      <div>
        <DoctorList />
      </div>
    </>
  );
};

export default FindADoctor;
