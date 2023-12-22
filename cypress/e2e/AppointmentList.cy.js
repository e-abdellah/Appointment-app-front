describe("AppointmentList", () => {
  beforeEach(() => {
    cy.loginDoctor("abdellah.elhalimimerroun@student.hogent.be", "12345678");
    // cy.get(".app-navbar-profile").click(); // Click on the profile dropdown
    // cy.get('[data-cy="my-appointments-btn"]').click();
    cy.visit("/my-appointments");
  });

  it("renders the AppointmentList component", () => {
    cy.get(".appointment-list__title").should("contain", "Appointments");
  });

  it("displays the correct number of appointments", () => {
    cy.get(".appointment-list__item").should("have.length", 9);
  });

  it("updates an appointment when the save button is clicked", () => {
    cy.get("[data-cy=edit-button]").last().click({ force: true });
    cy.get("[data-cy=condition-input]").last().clear({ force: true }).type("New condition");
    cy.get("[data-cy=save-button]").last().click();
    cy.get("[data-cy=condition]").last().should("contain", "New condition");
  });

  // it("deletes an appointment when the delete button is clicked", () => {
  //   cy.get("[data-cy=delete-button]").last().click();
  //   cy.get(".appointment-list__item").should("have.length", 8);
  // });

  it("should show an error if the API call fails", () => {
    cy.intercept("GET", "http://localhost:9000/api/appointments", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });

    cy.visit("/my-appointments");

    cy.get("[data-cy=axios_error_message").should("exist");
  });

  it("checks if the edit button changes, saves and cancels when clicked", () => {
    cy.get("[data-cy=edit-button]").last().click();
    cy.get("[data-cy=save-button]").should("exist");
    cy.get("[data-cy=cancel-button]").should("exist");
  });

  it("checks if the appointment details are displayed correctly", () => {
    cy.get("[data-cy=appointment-1]").within(() => {
      cy.get("[data-cy=description]").should(
        "contain.text",
        "Annual Health Checkup"
      );
      cy.get("[data-cy=numberOfBeds]").should("contain", "3");
      cy.get("[data-cy=condition]").should(
        "contain",
        "Chest pain and shortness of breath"
      );
      cy.get("[data-cy=date]").should(
        "contain",
        "December 15, 2023 at 08:15 AM"
      );
      cy.get("[data-cy=doctor-id]").should("contain", "10");
      cy.get("[data-cy=doctor-name]").should("contain", "Dr. Olivia Anderson");
      cy.get("[data-cy=patient-id]").should("contain", "1");
      cy.get("[data-cy=patient-name]").should("contain", "Emily Smith");
      cy.get("[data-cy=edit-button]").should("exist");
      cy.get("[data-cy=delete-button]").should("exist");
      cy.get("[data-cy=save-button]").should("not.exist");
      cy.get("[data-cy=cancel-button]").should("not.exist");
    });
  });
});





/*
 const handleRegister = useCallback(
    async (values) => {
      console.log("Form submitted with values:", values);
      try {
        // Determine the role based on isDoctorRegister
        const role = isDoctorRegister ? "doctor" : "patient";
        console.log("Role from Register:", role);
  
        // Pass the role to the register function along with the other form values
        const loggedIn = await register({ ...values, role });
  
        if (loggedIn) {
          console.log("Navigating...");
          navigate({
            pathname: "/",
            replace: true,
          });
          console.log("Registration successful");
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    [register, navigate, isDoctorRegister]
  );


  auth:




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
// const PATIENT_ID_KEY = "patientId";
// const DOCTOR_ID_KEY = "doctorId";
const USER_ID_KEY = "userId";
const ROLE_KEY = "role";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  // const patientId = localStorage.getItem(PATIENT_ID_KEY);
  // const doctorId = localStorage.getItem(DOCTOR_ID_KEY);
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
        const role = localStorage.getItem(ROLE_KEY);

        if (role === "patient") {
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

  const setSession = useCallback((token, user) => {
    setToken(token);
    setUser(user);

    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, user.id);
  }, []);

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

*/
