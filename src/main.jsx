import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import HomePage from "./components/pages/Home/HomePage";
import FindADoctor from "./components/FindADoct/FindADoctor";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "findADoctor", element: <FindADoctor /> },
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
