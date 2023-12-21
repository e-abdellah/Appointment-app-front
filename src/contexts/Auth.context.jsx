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
const USER_ID_KEY = "userId";
const ROLE_KEY = "role";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const userId = localStorage.getItem(USER_ID_KEY);

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

        localStorage.setItem(USER_ID_KEY, user.id);

        console.log("user", user);
        console.log("user id:", user.id);

        return true;
      } catch (error) {
        console.error(error);
        // If the server responds with a status of 401, return an error message
        if (error.response && error.response.status === 401) {
          return "This email does not exist.";
        }
        return false;
      }
    },
    [doPatientLogin, doDoctorLogin]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const setSession = useCallback((token, user) => {
    setToken(token);
    setUser(user);

    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, user.id);
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

  const registerPatient = useCallback(
    async (data) => {
      try {
        const { token, user } = await doPatientRegister(data);
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doPatientRegister, setSession]
  );

  const registerDoctor = useCallback(
    async (data) => {
      try {
        const { token, user } = await doDoctorRegister(data);
        setSession(token, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doDoctorRegister, setSession]
  );

  const register = useCallback(
    async (data) => {
      const { role, ...values } = data;
      console.log("role from auth", role);
      if (role === "patient") {
        return registerPatient(values);
      } else if (role === "doctor") {
        return registerDoctor(values);
      } else {
        console.error("Invalid role");
        return false;
      }
    },
    [registerPatient, registerDoctor]
  );

  const value = useMemo(
    () => ({
      token,
      user,
      userId,
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
      userId,
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
