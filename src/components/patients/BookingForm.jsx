import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  timeSlot: Yup.string().required("Required"),
});

const BookingForm = ({ onSaveBooking, timeSlots }) => {
  const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const workingDays = timeSlots.map((slot) => daysMap[slot.day]);

  const isWorkingDay = (date) => {
    const day = date.getDay();
    return workingDays.includes(day);
  };

  return (
    <div className="booking-form">
      <h1 className="booking-form__title">Book an appointment</h1>
      <Formik
        initialValues={{
          patient: "",
          date: "",
          condition: "",
          address: "",
          timeSlot: "",
        }}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          onSaveBooking(values);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values }) => {
          useEffect(() => {
            if (values.date) {
              const selectedDay = daysMap[values.date.getDay()];
              const selectedTimeSlot = timeSlots.find(
                (slot) => slot.day === selectedDay
              );
              if (selectedTimeSlot) {
                setFieldValue("timeSlot", selectedTimeSlot.time);
              }
            } else {
              // Set the default time slot to the first available slot
              setFieldValue("timeSlot", timeSlots[0].time);
            }
          }, [values.date]);

          return (
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
                  data-cy="name_input"
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
                <DatePicker
                  id="date"
                  name="date"
                  selected={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  minDate={new Date()}
                  filterDate={isWorkingDay}
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
                <label htmlFor="timeSlot" className="booking-form__label">
                  Available Time Slots
                </label>
                <Field
                  as="select"
                  id="timeSlot"
                  name="timeSlot"
                  className="booking-form__input"
                >
                  {timeSlots &&
                    timeSlots.map((slot, index) => (
                      <option key={index} value={slot.time}>
                        {/* {slot.day}:  */} {slot.time}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="timeSlot"
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
                  data-cy="condition_input"
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
                  data-cy="address_input"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="booking-form__error"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="booking-form__button"
              >
                Book
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;
