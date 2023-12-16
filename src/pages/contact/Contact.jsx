import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Contact.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string()
    .required("Email is required")
    .test("is-email", "Invalid email address", (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    ),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Please enter a valid phone number with only digits"),
  message: Yup.string().required("Required"),
});

const Contact = () => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Do something with values
    console.log(values);

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <div className="contact">
      <div className="contact__container">
        <div className="contact__form-container">
          <h1 className="contact__title">Contact Us</h1>
          <Formik
            initialValues={{
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@student.hogent.be",
              phoneNumber: "0123456789",
              message:
                "I recently experienced some concerning symptoms and would like to discuss them further during my upcoming appointment. The symptoms include [describe symptoms], and I would appreciate any guidance or insights you can provide. Thank you.",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="contact__form">
                <label htmlFor="firstName" className="contact__label">
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="contact__input"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="contact__error"
                />

                <label htmlFor="lastName" className="contact__label">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="contact__input"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="contact__error"
                />

                <label htmlFor="email" className="contact__label">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="contact__input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="contact__error"
                />

                <label htmlFor="phoneNumber" className="contact__label">
                  Phone Number
                </label>
                <Field
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  className="contact__input"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="contact__error"
                />

                <label htmlFor="message" className="contact__label">
                  Message
                </label>
                <Field
                  name="message"
                  as="textarea"
                  placeholder="Enter your message"
                  className="contact__input"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="contact__error"
                />

                <button
                  type="submit"
                  className="contact__button"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="contact__info">
          <h2>Address</h2>
          <p>HealthCare Belgium </p>
          <p>ZonneStraat 44,</p>
          <p>9000 Gent, Belgium.</p>
          <h2>Customer Support</h2>
          <p>Monday to Friday: 8:00 - 20:00</p>
          <p>Phone number: 000 000 000</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
