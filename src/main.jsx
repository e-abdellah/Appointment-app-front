import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";

import HomePage from "./components/pages/home/HomePage";
import Services from "./components/pages/services/Services";
import FindADoctor from "./components/pages/findADoct/FindADoctor";
import DoctorPage from "./components/pages/doctorPage/DoctorPage";
import AboutUs from "./components/pages/about/AboutUs";
import Contact from "./components/pages/contact/Contact";
import PrivacyPolicy from "./components/pages/privacy&Terms/PrivacyPolicies";
import TermsAndConditions from "./components/pages/privacy&terms/Terms&Conditions";
import NotFound from "./components/pages/notFound/NotFound";
import { AuthProvider } from "./contexts/Auth.context";
import Login from "./components/pages/login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/pages/logout/Logout";
import { ThemeProvider } from "./contexts/Theme.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "services", element: <Services /> },
      { path: "doctors", element: <FindADoctor /> },
      // { path: "doctors/:id", element: <DoctorPage /> },
      {
        path: "doctors/:id",
        element: <PrivateRoute />,
        children: [{ index: true, element: <DoctorPage /> }],
      },

      { path: "about", element: <AboutUs /> },

      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsAndConditions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
