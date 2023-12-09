import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const JWT_TOKEN_KEY = "jwtToken";
const PATIENT_ID_KEY = "patientId";
const DOCTOR_ID_KEY = "doctorId";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const {
    isMutating: patientLoading,
    error,
    trigger: doPatientLogin,
  } = useSWRMutation("patients/login", api.post);

  const {
    isMutating: doctorLoading,
    doctorError,
    trigger: doDoctorLogin,
  } = useSWRMutation("doctors/login", api.post);

  const login = useCallback(
    async (email, password, role) => {
      try {
        let loginResult;
        let user;
        if (role === "patient") {
          loginResult = await doPatientLogin({ email, password });
          user = { ...loginResult.patient, role: "patient" };
        } else if (role === "doctor") {
          loginResult = await doDoctorLogin({ email, password });
          user = { ...loginResult.doctor, role: "doctor" };
        } else {
          throw new Error("Invalid role");
        }

        const { token } = loginResult;

        setToken(token);
        setUser(user);

        localStorage.setItem(JWT_TOKEN_KEY, token);

        if (role === "patient") {
          localStorage.setItem(PATIENT_ID_KEY, user.id);
        } else if (role === "doctor") {
          localStorage.setItem(DOCTOR_ID_KEY, user.id);
        }

        return <Link to="/">Home</Link>;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doPatientLogin, doDoctorLogin]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(PATIENT_ID_KEY);
    localStorage.removeItem(DOCTOR_ID_KEY);
  }, []);

  const {
    isMutating: patientRegisterLoading,
    error: registerPatientError,
    trigger: doPatientRegister,
  } = useSWRMutation("patients/register", api.post);

  const {
    isMutating: doctorRegisterLoading,
    error: registerDoctorError,
    trigger: doDoctorRegister,
  } = useSWRMutation("doctors/register", api.post);

  const register = useCallback(
    async (data, role) => {
      try {
        console.log(
          "Register function called with data:",
          data,
          "and role:",
          role
        ); // Log the input values

        let registerResult;
        if (role === "patient") {
          console.log("Registering patient..."); // Log the start of patient registration
          registerResult = await doPatientRegister(data);
        } else if (role === "doctor") {
          console.log("Registering doctor..."); // Log the start of doctor registration
          registerResult = await doDoctorRegister(data);
        } else {
          throw new Error("Invalid role");
        }

        console.log("Registration result:", registerResult); // Log the result of the registration

        const { token, user } = registerResult;

        setToken(token);
        setUser(user);

        localStorage.setItem(JWT_TOKEN_KEY, token);

        if (role === "patient") {
          localStorage.setItem(PATIENT_ID_KEY, user.id);
        } else if (role === "doctor") {
          localStorage.setItem(DOCTOR_ID_KEY, user.id);
        }

        console.log("Registration successful"); // Log the success of the registration

        return true;
      } catch (error) {
        console.error("Registration error:", error); // Log any errors
        return false;
      }
    },
    [doPatientRegister, doDoctorRegister, setToken, setUser]
  );

  const value = useMemo(
    () => ({
      token,
      user,
      error,
      patientLoading,
      doctorError,
      doctorLoading,
      ready,
      isAuthed,
      login,
      logout,
      patientRegisterLoading,
      registerPatientError,
      doctorRegisterLoading,
      registerDoctorError,
      register,
    }),
    [
      token,
      user,
      error,
      patientLoading,
      doctorError,
      doctorLoading,
      ready,
      isAuthed,
      login,
      logout,
      patientRegisterLoading,
      registerPatientError,
      doctorRegisterLoading,
      registerDoctorError,
      register,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
