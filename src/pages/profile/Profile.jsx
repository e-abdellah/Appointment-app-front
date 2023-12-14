import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/Auth.context";
import "./Profile.css";

const Profile = () => {
  const { user, login } = useAuth(); // Assuming you have an updateUser function in your Auth context

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    street: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    birthdate: Yup.date().required("Required"),
  });

  const handleSubmit = async (values) => {
    await login(user.email, values.password, user.role); // Assuming updateUser takes the user's id and the new data as parameters
  };

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">My Profile</h1>
      {user && (
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="profile-page__form">
            <label htmlFor="name" className="profile-page__label">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="profile-page__input"
              placeholder={user.name}
            />
            <ErrorMessage
              name="name"
              component="div"
              className="profile-page__error"
            />

            {/* Add more fields here */}

            <button type="submit" className="profile-page__submit-button">
              Save Changes
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Profile;
