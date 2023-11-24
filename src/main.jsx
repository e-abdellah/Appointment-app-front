import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";

import HomePage from "./components/pages/Home/HomePage";
import Services from "./components/pages/services/Services";
import FindADoctor from "./components/pages/FindADoct/FindADoctor";
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

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "services", element: <Services /> },
      // { path: "doctors", element: <FindADoctor /> },
      // { path: "doctors/:id", element: <DoctorPage /> },
      {
        path: "doctors",
        element: <PrivateRoute />,
        children: [
          { index: true, element: <FindADoctor /> },
          { path: ":id", element: <DoctorPage /> },
        ],
      },

      { path: "about", element: <AboutUs /> },

      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsAndConditions /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

function App() {
  let element = useRoutes(routes);
  return element;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
