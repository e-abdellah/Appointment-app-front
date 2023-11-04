import React, { useState } from 'react';
import DoctorCard from '../../doctors/DoctorCard';
import { DOCTOR_DATA } from '../../../api/mock_data';
import './FindADoctor.css';

const FindADoctor = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchClick = () => {
    const matchingDoctors = DOCTOR_DATA.filter(doctor =>
      doctor.doctor.toLowerCase().includes(searchInput.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(matchingDoctors);
    setHasSearched(true);
  };

  return (
    <div className="findADoctor">
      <h1 className="findADoctor__title">Find a Doctor</h1>
      <div className="findADoctor__searchBar">
        <input type="text" placeholder="Search by doctor name or specialty" className="findADoctor__searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button className="findADoctor__searchButton" onClick={handleSearchClick}>Search</button>
      </div>
      <div className="findADoctor__results">
        {hasSearched && searchResults.length === 0 ? <div className='alert alert-info'>No doctor found</div> : searchResults.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
      </div>
    </div>
  );
  
};

export default FindADoctor;
