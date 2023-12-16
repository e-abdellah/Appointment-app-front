import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";
import Error from "../../components/Error";
import Loader from "../../components/loader/Loader";
import "./Login.css";

const validationRules = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .test("is-email", "Invalid email address", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    ),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const Login = () => {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isPatientLogin = location.pathname.startsWith("/patients/login");

  const initialValues = {
    email: isPatientLogin
      ? "emily.smith@gmail.com"
      : "abdellah.elhalimimerroun@student.hogent.be",
    password: "12345678",
    role: isPatientLogin ? "patient" : "doctor",
  };

  const handleLogin = useCallback(
    async (values) => {
      console.log("Values:", values);

      const loggedIn = await login(values.email, values.password, values.role);

      if (loggedIn) {
        console.log("Logged in:", loggedIn);
        navigate({
          pathname: `/`,
          replace: true,
        });
      }
    },
    [login, navigate]
  );

  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        validationSchema={validationRules}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values);
          resetForm();
        }}
      >
        <Form className="login__form">
          <h1 className="login__title">
            {isPatientLogin ? "Patient" : "Doctor"} Sign in
          </h1>
          <Error error={error} />

          <div className="login__input-container">
            <label htmlFor="email" className="login__label">
              Email
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="your@email.com"
              className="login__input"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="login__error"
            />
          </div>

          <div className="login__input-container">
            <label htmlFor="password" className="login__label">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="login__input"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="login__error"
            />
          </div>

          <div className="login__buttons clearfix">
            <div className="login__btn-group float-end">
              <button
                type="submit"
                className="login__button login__button--primary"
                disabled={loading}
              >
                Sign in
              </button>

              <button type="reset" className="login__button">
                Cancel
              </button>
            </div>
          </div>

          {loading && <Loader />}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
