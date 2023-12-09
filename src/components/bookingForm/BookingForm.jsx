import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./BookingForm.css";
import CustomInput from "../patients/CustomInput";

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
        {({ isSubmitting, errors, touched, setFieldValue, values }) => {
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
              {/* Use CustomInput for each form field */}
              <CustomInput
                label="Name and surname"
                name="patient"
                type="text"
                errors={errors}
                touched={touched}
                dataCy="name_input"
              />
              <CustomInput
                label="Date"
                name="date"
                type="datepicker"
                errors={errors}
                touched={touched}
                isWorkingDay={isWorkingDay}
                dataCy="date_input"
              />
              <CustomInput
                label="Available Time Slots"
                name="timeSlot"
                type="select"
                errors={errors}
                touched={touched}
                dataCy="timeSlot_input"
              >
                {timeSlots &&
                  timeSlots.map((slot, index) => (
                    <option key={index} value={slot.time}>
                      {slot.time}
                    </option>
                  ))}
              </CustomInput>
              <CustomInput
                label="Condition"
                name="condition"
                type="text"
                errors={errors}
                touched={touched}
                dataCy="condition_input"
              />
              <CustomInput
                label="Address"
                name="address"
                type="text"
                errors={errors}
                touched={touched}
                dataCy="address_input"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="booking-form__button"
              >
                Book Appointment
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default BookingForm;
