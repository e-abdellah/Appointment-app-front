import doc1 from "../../assets/imgs/doc1.jpg";
import doc2 from "../../assets/imgs/doc2.jpg";
import doc3 from "../../assets/imgs/doc3.jpg";

let PATIENT_DATA = [
  {
    id: 1,
    name: "Emily Smith",
    street: "789 Oak Street",
    number: "Apt 3C",
    postalCode: "54321",
    city: "Metropolitan City",
    condition: "Chest pain and shortness of breath",
    birthdate: "2001-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "David Brown",
    street: "456 Elm Avenue",
    number: "Suite 5D",
    postalCode: "12345",
    city: "Urbanville",
    condition: "Toothache and cavity",
    birthdate: "2002-02-02T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Sophia Davis",
    street: "101 Pine Road",
    number: "Unit 7B",
    postalCode: "67890",
    city: "Cityscape",
    condition: "Knee pain and difficulty walking",
    birthdate: "2003-03-03T00:00:00.000Z",
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
    doctor: "Dr. Olivia Anderson",
    specialty: "Cardiologist",
    numberOfPatients: 3, //this week
    hospital: "AZ Groeninge",
    photo: doc1,
    numberOfRatings: 5,
    rating: " 5",
    about:
      "Dr. Olivia Anderson is a dedicated and experienced cardiologist, currently practicing at AZ Groeninge. With a patient-first approach, she has successfully treated numerous patients, earning a 5-star rating. Her commitment to her profession is reflected in the positive health outcomes of her patients. She continually strives to provide the best cardiac care, keeping herself updated with the latest in cardiology.",
    timeSlots: [
      { day: "Monday", time: "7:30 - 15:30" },
      { day: "Tuesday", time: "16:30 - 19:30" },
      { day: "Wednesday", time: "12:00 - 15:30" },
      { day: "Friday", time: "9:30 - 14:00" },
    ],
  },
  {
    id: 2,
    doctor: "Dr. Michael Brown Smith",
    specialty: "Dentist",
    numberOfPatients: 2,
    hospital: "AZ Sint-Jan Brugge-Oostende",
    photo: doc2,
    numberOfRatings: 6,
    rating: " 4.5",
    about:
      "Dr. Michael Brown Smith is a highly skilled dentist at AZ Sint-Jan Brugge-Oostende. He has a patient-centric approach and is known for his gentle and efficient dental procedures. His patients appreciate his thoroughness and his commitment to their dental health, earning him a 4.5-star rating.",
    timeSlots: [
      { day: "Sunday", time: "16:30 - 19:30" },
      { day: "Tuesday", time: "16:30 - 19:00" },
      { day: "Wednesday", time: "12:00 - 15:30" },
      { day: "Thursday", time: "6:30 - 12:30" },
    ],
  },
  {
    id: 3,
    doctor: "Dr. John Davis Wilson",
    specialty: "Orthopedic Surgeon",
    numberOfPatients: 1,
    hospital: "AZ Turnhout",
    photo: doc3,
    numberOfRatings: 7,
    rating: " 4",
    about:
      "Dr. John Davis Wilson is a renowned orthopedic surgeon at AZ Turnhout. He specializes in diagnosing and treating disorders related to the musculoskeletal system. His dedication to his patients and his field is evident in his work, earning him a 4-star rating. He is committed to helping his patients regain mobility and improve their quality of life.",
    timeSlots: [
      { day: "Saturday", time: "16:30 - 20:30" },
      { day: "Monday", time: "6:30 - 13:00" },
      { day: "Tuesday", time: "16:30 - 19:30" },
      { day: "Wednesday", time: "12:00 - 15:00" },
    ],
  },
];

export { PATIENT_DATA, APPOINTMENT_DATA, DOCTOR_DATA };
