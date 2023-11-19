import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import NotFound from "./components/notFound/NotFound";
import Layout from "./components/Layout";
import HomePage from "./components/pages/Home/HomePage";
import FindADoctor from "./components/FindADoct/FindADoctor";
import AboutUs from "./components/about/AboutUs";
import DoctorPage from "./components/pages/doctorPage/DoctorPage";
import Services from "./components/pages/services/Services";
import Contact from "./components/pages/contact/Contact";
import PrivacyPolicy from "./components/pages/privacy&Terms/PrivacyPolicies";
import TermsAndConditions from "./components/pages/privacy&terms/Terms&Conditions";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <Services /> },
      { path: "doctors", element: <FindADoctor /> },
      { path: "doctors/:id", element: <DoctorPage /> },
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
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
