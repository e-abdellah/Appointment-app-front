let PATIENT_DATA = [
  {
    id: 1,
    name: "Emily Smith",
    street: "789 Oak Street",
    number: "Apt 3C",
    postalCode: "54321",
    city: "Metropolitan City",
    condition: "Chest pain and shortness of breath",
    birthdate: "2001-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "David Brown",
    street: "456 Elm Avenue",
    number: "Suite 5D",
    postalCode: "12345",
    city: "Urbanville",
    condition: "Toothache and cavity",
    birthdate: "2002-02-02T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Sophia Davis",
    street: "101 Pine Road",
    number: "Unit 7B",
    postalCode: "67890",
    city: "Cityscape",
    condition: "Knee pain and difficulty walking",
    birthdate: "2003-03-03T00:00:00.000Z"
  },
];

let APPOINTMENT_DATA = [
  {
    id: 1,
    patientId: 1,
    patient: "Emily Smith",
    doctor: "Dr. Olivia Williams Anderson",
    doctorId: 1,
    date: "2023-10-20T10:30:00.000Z",
    description: "Annual Health Checkup",
    numberOfBeds: 3,
    condition: "Chest pain and shortness of breath",
  },
  {
    id: 2,
    patientId: 2,
    patient: "David Brown",
    doctor: "Dr. Michael Brown Smith",
    doctorId: 2,
    date: "2023-10-25T15:15:00.000Z",
    description: "Dental Cleaning",
    numberOfBeds: 2,
    condition: "Toothache and cavity",
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 3,
    patient: "Sophia Davis",
    doctor: "Dr. Jessica Davis Wilson",
    date: "2023-11-05T11:00:00.000Z",
    description: "Orthopedic Consultation",
    numberOfBeds: 1,
    condition: "Knee pain and difficulty walking",
  },
];

let DOCTOR_DATA = [
  {
    id: 1,
    doctor: "Dr. Olivia Williams Anderson",
    specialty: "Cardiologist",
    numberOfPatients: 3, //this week
  },
  {
    id: 2,
    doctor: "Dr. Michael Brown Smith",
    specialty: "Dentist",
    numberOfPatients: 2,
  },
  {
    id: 3,
    doctor: "Dr. Jessica Davis Wilson",
    specialty: "Orthopedic Surgeon",
    numberOfPatients: 1,
  },
];

// export default APPOINTMENT_DATA;

export { PATIENT_DATA, APPOINTMENT_DATA, DOCTOR_DATA };
