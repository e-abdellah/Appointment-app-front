import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/home/HomePage";
import Services from "./pages/services/Services";
import FindADoctor from "./pages/findADoct/FindADoctor";
import DoctorPage from "./pages/doctorPage/DoctorPage";
import AboutUs from "./pages/about/AboutUs";
import Contact from "./pages/contact/Contact";
import PrivacyPolicy from "./pages/privacyTerms/PrivacyPolicies";
import TermsOfService from "./pages/privacyTerms/TermsOfService";
import NotFound from "./pages/notFound/NotFound";
import { AuthProvider } from "./contexts/Auth.context";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/logout/Logout";
import { ThemeProvider } from "./contexts/Theme.context";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import AppointmentList from "./pages/myAppointments/AppointmentList";
import PatientList from "./pages/myPatients/PatientList";
import DoctorList from "./components/doctors/DoctorList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "patients/login", element: <Login /> },
      { path: "doctors/login", element: <Login /> },
      { path: "patients/register", element: <Register /> },
      { path: "doctors/register", element: <Register /> },
      { path: "my-profile", element: <Profile /> },
      { path: "logout", element: <Logout /> },
      { path: "services", element: <Services /> },
      { path: "doctors", element: <FindADoctor /> },
      // { path: "doctors/:doctorId", element: <DoctorPage /> },
      {
        path: "doctors/:doctorId",
        element: <PrivateRoute />,
        children: [{ index: true, element: <DoctorPage /> }],
      },
      {
        path: "my-appointments",
        element: <PrivateRoute />,
        children: [{ index: true, element: <AppointmentList /> }],
      },
      {
        path: "all-patients",
        element: <PrivateRoute />,
        children: [{ index: true, element: <PatientList /> }],
      },
      {
        path: "all-doctors",
        element: <PrivateRoute />,
        children: [{ index: true, element: <DoctorList /> }],
      },
      {
        path: "contact",
        element: <PrivateRoute />,
        children: [{ index: true, element: <Contact /> }],
      },
      { path: "about", element: <AboutUs /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
