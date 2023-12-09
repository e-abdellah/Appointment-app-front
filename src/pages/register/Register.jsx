// import React from "react";
// import Userfront, { SignupForm } from "@userfront/toolkit/react";

// Userfront.init("xbp49ddb");

// const Register = () => {
//   return <SignupForm />;
// };

// export default Register;



import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/Auth.context";
import Error from "../../components/Error";
import "./Register.css";

const TimeSlotsInput = ({ field, form }) => {
  const handleTimeSlotChange = (dayIndex, fieldIndex, value) => {
    form.setFieldValue(`doctor.timeSlots[${dayIndex}][${fieldIndex}]`, value);
  };

  const handleAvailabilityChange = (dayIndex, value) => {
    form.setFieldValue(`doctor.timeSlots[${dayIndex}].available`, value);
  };

  return (
    <div>
      {field.value.map((day, dayIndex) => (
        <div key={dayIndex}>
          <p>{day.day}</p>
          <div>
            <label>Available:</label>
            <input
              type="checkbox"
              checked={day.available}
              onChange={(e) =>
                handleAvailabilityChange(dayIndex, e.target.checked)
              }
            />
          </div>
          <div>
            <label>Start Time:</label>
            <Field
              type="time"
              name={`doctor.timeSlots[${dayIndex}][0]`}
              onChange={(e) =>
                handleTimeSlotChange(dayIndex, 0, e.target.value)
              }
              disabled={!day.available}
            />
          </div>
          <div>
            <label>End Time:</label>
            <Field
              type="time"
              name={`doctor.timeSlots[${dayIndex}][1]`}
              onChange={(e) =>
                handleTimeSlotChange(dayIndex, 1, e.target.value)
              }
              disabled={!day.available}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const validationRules = Yup.object().shape({
  doctor: Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .test("is-email", "Invalid email address", (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    speciality: Yup.string().required("Speciality is required"),
    numberOfPatients: Yup.number()
      // .required("Number of Patients is required")
      .positive("Number of Patients must be positive"),
    photo: Yup.string().url("Invalid URL format"),
    hospital: Yup.string().required("Hospital is required"),
    about: Yup.string().required("About is required"),
  }),
  patient: Yup.object().shape({
    email: Yup.string()
      .required("Required")
      .test("is-email", "Invalid email address", (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
      ),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    street: Yup.string().required("Street is required"),
    number: Yup.string().required("Number is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    city: Yup.string().required("City is required"),
    birthdate: Yup.date().required("Birthdate is required"),
  }),
});

const formConfig = {
  doctor: [
    { name: "email", label: "Email" },
    { name: "password", label: "Password", type: "password" },
    { name: "name", label: "Name" },
    { name: "speciality", label: "Speciality" },
    { name: "numberOfPatients", label: "Number of Patients", type: "number" },
    { name: "photo", label: "Photo URL" },
    { name: "hospital", label: "Hospital" },
    { name: "about", label: "About" },
    { name: "timeSlots", label: "Time Slots", type: "timeslots" },
  ],
  patient: [
    { name: "email", label: "Email" },
    { name: "password", label: "Password", type: "password" },
    { name: "name", label: "Name" },
    { name: "street", label: "Street" },
    { name: "number", label: "Number" },
    { name: "postalCode", label: "Postal Code" },
    { name: "city", label: "City" },
    { name: "birthdate", label: "Birthdate", type: "date" },
  ],
};

const Register = () => {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const isDoctorRegister =
    window.location.pathname.startsWith("/doctors/register");

  const initialValues = isDoctorRegister
    ? {
        doctor: {
          email: "doctor@example.com",
          password: "12345678",
          name: "John Doe",
          speciality: "Cardiologist",
          numberOfPatients: "2",
          photo: "",
          hospital: "City Hospital",
          about: "Experienced cardiologist with a focus on patient care.",
          timeSlots: [
            { day: "Monday", start: "", end: "", available: false },
            { day: "Tuesday", start: "", end: "", available: false },
            { day: "Wednesday", start: "", end: "", available: false },
            { day: "Thursday", start: "", end: "", available: false },
            { day: "Friday", start: "", end: "", available: false },
            { day: "Saturday", start: "", end: "", available: false },
            { day: "Sunday", start: "", end: "", available: false },
          ],
        },
      }
    : {
        patient: {
          email: "patient@example.com",
          password: "12345678",
          name: "New Patient",
          street: "789 Oak Street",
          number: "3C",
          postalCode: "9000",
          city: "Metropolitan City",
          birthdate: "2001-10-01T00:00:00.000Z",
        },
      };

  const handleRegister = useCallback(
    async (values) => {
      console.log("Form submitted with values:", values);
      try {
        const loggedIn = await register(
          values,
          isDoctorRegister ? "doctor" : "patient"
        );

        if (loggedIn) {
          console.log("Navigating...");
          navigate({
            pathname: "/findADoctor",
            replace: true,
          });
          console.log("Registration successful");
        }
        //   useEffect(() => {
        //     if (loggedIn) {
        //       navigate({
        //         pathname: "/findADoctor",
        //         replace: true,
        //       });
        //       console.log("Registration successful");
        //     }
        //   }, [loggedIn, navigate]);

      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    [register, navigate, isDoctorRegister]
  );

  return (
    <div className="register">
      <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={handleRegister}
      >
        <Form className="login__form">
          <h1 className="login__title">
            Register as {isDoctorRegister ? "Doctor" : "Patient"}
          </h1>
          <Error error={error} />

          {formConfig[isDoctorRegister ? "doctor" : "patient"].map((field) => (
            <div className="login__input-container" key={field.name}>
              <label htmlFor={field.name} className="login__label">
                {field.label}
              </label>
              <Field
                name={`${isDoctorRegister ? "doctor" : "patient"}.${
                  field.name
                }`}
                component={
                  field.type === "timeslots" ? TimeSlotsInput : "input"
                }
                placeholder={field.label}
                type={field.type || "text"}
                className="login__input"
              />
              <ErrorMessage
                name={`${isDoctorRegister ? "doctor" : "patient"}.${
                  field.name
                }`}
                component="div"
                className="login__error"
              />
            </div>
          ))}

          <div className="login__buttons clearfix">
            <div className="login__btn-group float-end">
              <button
                type="submit"
                className="login__button"
                disabled={loading}
              >
                Register
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
