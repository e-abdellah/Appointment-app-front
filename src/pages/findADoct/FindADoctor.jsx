import React, { useState, useEffect } from "react";
import useSWR from "swr";
import DoctorCard from "../../components/doctors/DoctorCard";
import AsyncData from "../../components/AsyncData";
import DoctorCards from "../../components/doctors/DoctorsCards";
import "./FindADoctor.css";
import { getAll } from "../../api";

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
            className="findADoctor__searchButton"
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
        <DoctorCards />
      </div>
    </>
  );
};

export default FindADoctor;
