import React from "react";
import DatePicker from "react-datepicker";
import { Field, ErrorMessage, useFormikContext } from "formik";

const CustomInput = ({
  label,
  name,
  type,
  dataCy,
  isWorkingDay,
  ...rest
}) => {
  const formikContext = useFormikContext();
  const { errors, touched } = formikContext;

  const hasError = errors[name] && touched[name];

  return (
    <div className="booking-form__input-container">
      <label htmlFor={name} className="booking-form__label">
        {label}
      </label>
      {type === "text" ? (
        <Field
          type={type}
          id={name}
          name={name}
          className={`booking-form__input ${hasError ? "input-error" : ""}`}
          data-cy={dataCy}
          {...rest}
        />
      ) : (
        <DatePicker
          id={name}
          name={name}
          selected={rest.value}
          onChange={(date) => rest.onChange(name, date)}
          minDate={new Date()}
          filterDate={isWorkingDay}
          className={`booking-form__input ${hasError ? "input-error" : ""}`}
        />
      )}
      {hasError && (
        <ErrorMessage
          name={name}
          component="p"
          className="booking-form__error"
        />
      )}
    </div>
  );
};

export default CustomInput;
