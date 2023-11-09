import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./BookingForm.css";

const validationSchema = Yup.object({
  patient: Yup.string()
    .required("Required")
    .min(2, "Must be at least 2 characters"),
  date: Yup.date().required("Required"),
  condition: Yup.string()
    .required("Required")
    .min(5, "Must be at least 5 characters"),
  address: Yup.string().required("Required"),
});

const BookingForm = ({ onSaveBooking }) => {
  return (
    <div className="booking-form">
      <h2 className="booking-form__title">Book an Appointment</h2>
      <br />
      <Formik
        initialValues={{
          patient: "",
          date: "",
          condition: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          onSaveBooking(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="booking-form__input-container">
              <label htmlFor="patient" className="booking-form__label">
                Name and surname
              </label>
              <Field
                type="text"
                id="patient"
                name="patient"
                placeholder="Enter your full name"
                className={`booking-form__input ${
                  errors.patient ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="patient"
                component="p"
                className="booking-form__error"
              />
            </div>

            <div className="booking-form__input-container">
              <label htmlFor="date" className="booking-form__label">
                Date
              </label>
              <Field
                type="date"
                id="date"
                name="date"
                className={`booking-form__input ${
                  errors.date ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="date"
                component="p"
                className="booking-form__error"
              />
            </div>

            <div className="booking-form__input-container">
              <label htmlFor="condition" className="booking-form__label">
                Condition
              </label>
              <Field
                type="text"
                id="condition"
                name="condition"
                placeholder="Enter your condition"
                className={`booking-form__input ${
                  errors.condition ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="condition"
                component="p"
                className="booking-form__error"
              />
            </div>

            <div className="booking-form__input-container">
              <label htmlFor="address" className="booking-form__label">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                placeholder="Enter your full address"
                className={`booking-form__input ${
                  errors.address ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="address"
                component="p"
                className="booking-form__error"
              />
            </div>
            <div className="clearfix">
              <div className="btn-group float-end">
                <button
                  type="submit"
                  className="booking-form__button"
                  disabled={isSubmitting}
                >
                  Add Booking
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
