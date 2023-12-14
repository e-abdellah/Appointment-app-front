import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const JWT_TOKEN_KEY = "jwtToken";
const PATIENT_ID_KEY = "patientId";
const DOCTOR_ID_KEY = "doctorId";
const ROLE_KEY = "role";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const patientId = localStorage.getItem(PATIENT_ID_KEY);
  const doctorId = localStorage.getItem(DOCTOR_ID_KEY);

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
    async (email, password) => {
      try {
        let loginResult;
        const url = window.location.href;

        if (url.includes("/patients/login")) {
          console.log("doPatientLogin");
          loginResult = await doPatientLogin({ email, password });
        } else {
          console.log("doDoctorLogin");
          loginResult = await doDoctorLogin({ email, password });
        }

        const { token, user } = loginResult;

        setToken(token);
        setUser(user);

        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(ROLE_KEY, user.roles[0]);

        if (user.role === "patient") {
          localStorage.setItem(PATIENT_ID_KEY, user.id);
        }
        if (user.role === "doctor") {
          localStorage.setItem(DOCTOR_ID_KEY, user.id);
        }

        console.log("user", user);
        console.log("user id:", user.id);

        return true;
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
          console.log(data);
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
      patientId,
      doctorId,
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
      patientId,
      doctorId,
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
