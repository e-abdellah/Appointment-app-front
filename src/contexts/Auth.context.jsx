import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { Link } from "react-router-dom"; // Import Link
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const JWT_TOKEN_KEY = "jwtToken";
const PATIENT_ID_KEY = "patientId";
const DOCTOR_ID_KEY = "doctorId";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [patient, setPatient] = useState(null);
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
        if (role === "patient") {
          loginResult = await doPatientLogin({ email, password });
        } else if (role === "doctor") {
          loginResult = await doDoctorLogin({ email, password });
        } else {
          throw new Error("Invalid role");
        }

        const { token, patient } = loginResult;

        setToken(token);
        setPatient(patient);

        localStorage.setItem(JWT_TOKEN_KEY, token);

        if (role === "patient") {
          localStorage.setItem(PATIENT_ID_KEY, patient.id);
        } else if (role === "doctor") {
          localStorage.setItem(DOCTOR_ID_KEY, patient.id);
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
    setPatient(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(PATIENT_ID_KEY);
    localStorage.removeItem(DOCTOR_ID_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      patient,
      error,
      patientLoading,
      doctorError,
      doctorLoading,
      ready,
      isAuthed,
      login,
      logout,
    }),
    [
      token,
      patient,
      error,
      patientLoading,
      doctorError,
      doctorLoading,
      ready,
      isAuthed,
      login,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
