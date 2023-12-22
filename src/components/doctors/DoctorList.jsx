import React from "react";
    import useSWR from "swr";
    import useSWRMutation from "swr/mutation";
    import { getAll, deleteById, put } from "../../api";
    import Doctor from "./Doctor";
    import Error from "../Error";
    import AsyncData from "../AsyncData";
    import { useAuth } from "../../contexts/Auth.context";
    import "./DoctorList.css";
    import Loader from "../loader/Loader";
    import Unauthorized from "../unauthorized/Unauthorized";

    const DoctorList = () => {
      const { user } = useAuth();
      const { data: doctors = [], error, isLoading } = useSWR("doctors", getAll);
      const { trigger: deleteDoctor, error: deleteError } = useSWRMutation(
        "doctors",
        deleteById
      );
      const { trigger: updateDoctor } = useSWRMutation("doctors", put);
      
      if (isLoading) return <Loader />;
      
      // if (!user || !user.roles.includes("ADMIN")) {
      //   return <Unauthorized />;
      // }
      const sortedDoctors = doctors.sort((a, b) => a.id - b.id);

      return (
        <>
          <Error error={error} />
          <h1 className="doctor-list__title">Doctors</h1>
          <div className="doctor-list">
            {sortedDoctors.map((doctor) => (
              <div className="doctor-list__item" key={doctor.id} data-cy="doctor">
                <AsyncData loading={isLoading} error={error || deleteError}>
                  <Doctor
                    {...doctor}
                    onDelete={deleteDoctor}
                    onSave={updateDoctor}
                  />
                </AsyncData>
              </div>
            ))}
          </div>
        </>
      );
    };

    export default DoctorList;