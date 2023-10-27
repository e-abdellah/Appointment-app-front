import { useState, memo } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const toDateInputString = (date) => {
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf("T"));
};

const validationRules = {
  patient: {
    required: "patient is required",
    minLength: {
      value: 2,
      message: "patient must be at least 2 characters long",
    },
  },
  date: { valueAsDate: true },
};

function LabelInput({ label, name, type, validationRules, ...rest }) {
  const { errors, register } = useFormContext();

  return (
    <div className="mb-3 ml-20">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className="form-control"
        {...register(name, validationRules)}
        {...rest}
      />
      {name in errors ? (
        <p className="alert alert-danger">{errors[name].message}</p>
      ) : null}
    </div>
  );
}

export default memo(function BookingForm({ onSaveBooking }) {
  const {
    register, // nieuwe input velden registreren
    handleSubmit, // submit function opbouwen
    reset, // formulier leeg (op default waarde zetten)
    formState: { errors }, // errors van de validatie
  } = useForm({});

  const onSubmit = (data) => {
    // data = alle formulier velden
    console.log(data);
    const { patient, condition, address } = data;

    onSaveBooking(patient, condition, address);
    reset();
  };
  return (
    <>
      <h2 className="ml-20">
        <strong>Add Booking</strong>
      </h2>
      <br />
      <FormProvider errors={errors} register={register}>
        {" "}
        {/* = CONTEXT API /*/}
        <form className="w-50 mb-3" onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
            label="Name and surname"
            type="text"
            name="patient"
            placeholder="Name and surname"
            defaultValue=""
            validationRules={validationRules.patient}
          />
          <LabelInput
            label="Date"
            type="date"
            name="date"
            placeholder="date"
            defaultValue={toDateInputString(new Date())}
            validationRules={validationRules.date}
          />

          <LabelInput
            label="Condition"
            type="text"
            name="condition"
            defaultValue="constipation and cough"
            validationRules={validationRules.condition}
          />

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                Add Booking
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
});
