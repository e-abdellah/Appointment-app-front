import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './contact.css';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  phoneNumber: Yup.string()
    .required('Required'),
  message: Yup.string()
    .required('Required'),
});

const Contact = () => (
  <div className="contact">
    <div className="contact__container">
      <div className="contact__form-container">
        <h1 className="contact__title">Contact Us</h1>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="contact__form">
            <label htmlFor="firstName" className="contact__label">First Name</label>
            <Field name="firstName" type="text" className="contact__input" />
            <ErrorMessage name="firstName" component="div" className="contact__error" />

            <label htmlFor="lastName" className="contact__label">Last Name</label>
            <Field name="lastName" type="text" className="contact__input" />
            <ErrorMessage name="lastName" component="div" className="contact__error" />

            <label htmlFor="email" className="contact__label">Email</label>
            <Field name="email" type="email" className="contact__input" />
            <ErrorMessage name="email" component="div" className="contact__error" />

            <label htmlFor="phoneNumber" className="contact__label">Phone Number</label>
            <Field name="phoneNumber" type="text" className="contact__input" />
            <ErrorMessage name="phoneNumber" component="div" className="contact__error" />

            <label htmlFor="message" className="contact__label">Message</label>
            <Field name="message" as="textarea" className="contact__input" />
            <ErrorMessage name="message" component="div" className="contact__error" />

            <button type="submit" className="contact__button">Submit</button>
          </Form>
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

export default Contact;
