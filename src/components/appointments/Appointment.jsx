export default function appointment({ patient, condition, city, doctor }) {
  return (
    <div className='text-bg-dark' style={{ textAlign: 'center' }}>
      {patient} heeft {condition} en heeft een afspraak in {city} bij {doctor}
    </div>
  );
}