import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/Auth.context";
import Error from "../../components/Error";
import Loader from "../../components/loader/Loader";
import "./Register.css";

const validationRules = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .test("is-email", "Invalid email address", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    ),
  password: Yup.string().required("Password is required"),
  name: Yup.string().required("Name is required"),
});

const formConfig = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", type: "password" },
  { name: "name", label: "Name" },
];

const Register = () => {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const isDoctorRegister =
    window.location.pathname.startsWith("/doctors/register");

  const initialValues = {
    email: isDoctorRegister ? "doctor@example.com" : "patient@example.com",
    password: "12345678",
    name: isDoctorRegister ? "John Doe" : "New Patient",
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
            pathname: "/",
            replace: true,
          });
          console.log("Registration successful");
        }
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
        onSubmit={async (values) => {
          await handleRegister(values);
        }}
      >
        <Form className="login__form">
          <h1 className="login__title">
            Register as {isDoctorRegister ? "Doctor" : "Patient"}
          </h1>
          <Error error={error} />

          {formConfig.map((field) => (
            <div className="login__input-container" key={field.name}>
              <label htmlFor={field.name} className="login__label">
                {field.label}
              </label>
              <Field
                name={field.name}
                component={
                  field.type === "timeslots" ? TimeSlotsInput : "input"
                }
                placeholder={field.label}
                type={field.type || "text"}
                className="login__input"
              />
              <ErrorMessage
                name={field.name}
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
                {loading ? "Registering..." : "Register"}
              </button>
              {loading && <Loader />}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
