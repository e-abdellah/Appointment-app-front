import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Error from "../../components/Error";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../contexts/Auth.context";
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

  const handleLogin = useCallback(
    async (values) => {
      console.log("Values:", values);

      const loggedIn = await login(values.email, values.password, values.role);

      if (typeof loggedIn === "string") {
        // If the login function returns a string, it's an error message
        setTheError(loggedIn);
      } else if (loggedIn) {
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
        initialValues={{
          email: "",
          password: "",
          role: isPatientLogin ? "patient" : "doctor",
        }}
        validationSchema={validationRules}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          handleLogin(values).finally(() => {
            setSubmitting(false);
            resetForm();
          });
        }}
      >
        {({ isSubmitting }) => (
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
                data-cy="email-input"
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
                data-cy="password-input"
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
                  disabled={isSubmitting}
                  data-cy="login-button"
                >
                  Sign in
                </button>

                <button type="reset" className="login__button">
                  Cancel
                </button>
              </div>
            </div>
            {isSubmitting && <Loader />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
