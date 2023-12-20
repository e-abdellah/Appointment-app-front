import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./BookingForm.css";

const validationSchema = Yup.object({
  name: Yup.string().required().min(2),
  date: Yup.date()
    .required()
    .min(new Date(), "Date cannot be in the past")
    .max(
      new Date(new Date().setMonth(new Date().getMonth() + 3)),
      "Date cannot be more than 3 months in the future"
    ),
  time: Yup.string()
    .required()
    .test(
      "is-valid-time",
      "Time must be between 7:00-12:30 or 14:00-18:30",
      (value) => {
        const [hours, minutes] = value.split(":").map(Number);
        return (
          (hours >= 7 && hours < 12) ||
          (hours === 12 && minutes <= 30) ||
          (hours >= 14 && hours < 18) ||
          (hours === 18 && minutes <= 30)
        );
      }
    ),
  condition: Yup.string().required().min(5),
  description: Yup.string().required(),
});

const BookingForm = ({ onSaveBooking }) => {
  const descriptions = [
    "Choose an appointment type",
    "Annual Health Checkup",
    "Dental Cleaning",
    "Orthopedic Consultation",
    "Eye Exam",
    "Allergy Consultation",
    "Gastroenterology Checkup",
    "Cardiology Follow-up",
    "Pulmonology Evaluation",
    "Neurology Consultation",
  ];

  const formik = useFormik({
    initialValues: {
      name: "Sophia Davis",
      date: "2024-01-01",
      time: "12:00",
      description: descriptions[0],
      condition: "Knee pain and difficulty walking",
      numberOfBeds: 1,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSaveBooking(values);
      resetForm();
    },
  });

  return (
    <div className="booking-form">
      <h1 className="booking-form__title">Book an appointment</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="description" className="booking-form__label">
            description
          </label>
          <select
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className={`booking-form__input ${
              formik.errors.description ? "input-error" : ""
            }`}
          >
            {descriptions.map((desc, index) => (
              <option key={index} value={desc}>
                {desc}
              </option>
            ))}
          </select>
          {formik.errors.description ? (
            <div className="booking-form__error">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        {["name", "date", "time", "condition", "numberOfBeds"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="booking-form__label">
              {field}
            </label>
            {field === "time" ? (
              <input
                id={field}
                name={field}
                type="time"
                min="07:00"
                max="18:30"
                onChange={formik.handleChange}
                value={formik.values[field]}
                className={`booking-form__input ${
                  formik.errors[field] ? "input-error" : ""
                }`}
              />
            ) : (
              <input
                id={field}
                name={field}
                type={
                  field === "date" || field === "time"
                    ? field
                    : field === "numberOfBeds"
                    ? "number"
                    : "text"
                }
                onChange={formik.handleChange}
                value={formik.values[field]}
                className={`booking-form__input ${
                  formik.errors[field] ? "input-error" : ""
                }`}
                placeholder={
                  field === "numberOfBeds"
                    ? "Choose between a smaller or a larger room (if u have children)"
                    : ""
                }
              />
            )}
            {formik.errors[field] ? (
              <div className="booking-form__error">{formik.errors[field]}</div>
            ) : null}
          </div>
        ))}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="booking-form__button"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
