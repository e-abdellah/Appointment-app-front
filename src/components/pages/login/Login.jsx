import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth.context";
import Error from "../../Error";
import "./Login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .test("is-email", "Invalid email address", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    ),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "abdellah.elhalimimerroun@student.hogent.be",
  password: "12345678",
};

const Login = () => {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleLogin = useCallback(
    async ({ email, password }) => {
      console.log("Email:", email);
      console.log("Password:", password);
      const loggedIn = await login(email, password);

      if (loggedIn) {
        navigate({
          pathname: "/",
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
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values);
          resetForm();
        }}
      >
        <Form className="login__form">
          <h1 className="login__title">Sign in</h1>
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
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
