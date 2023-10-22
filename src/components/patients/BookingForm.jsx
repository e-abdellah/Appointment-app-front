import React, { memo } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const BookingForm = () => {
  const methods = useForm();

  const validationRules = {
    patient: {
      required: "Patient name is required",
      minLength: {
        value: 2,
        message: "Patient name must be at least 2 characters long",
      },
    },
    condition: {
      required: "Condition is required",
      minLength: {
        value: 2,
        message: "Condition must be at least 2 characters long",
      },
    },
    // TODO: City must be changed to Address
    city: {
      required: "City is required",
      minLength: {
        value: 2,
        message: "City must be at least 2 characters long",
      },
    },
  };

  const LabelInput = ({ label, name, type, ...rest }) => {
    const { errors, register } = useFormContext();

    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          id={name}
          type={type}
          className="form-control"
          {...register(name, validationRules[name])}
          {...rest}
        />
        {errors[name] && (
          <p className="alert alert-danger">{errors[name].message}</p>
        )}
      </div>
    );
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <LabelInput label="Patient Name" name="patient" type="text" />
        <LabelInput label="Condition" name="condition" type="text" />
        <LabelInput label="City" name="city" type="text" />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default memo(BookingForm);
