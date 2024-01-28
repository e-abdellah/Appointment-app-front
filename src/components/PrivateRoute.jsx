import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";

export default function PrivateRoute() {
  const { ready, isAuthed, role } = useAuth();
  const { pathname } = useLocation();

  const getLoginPath = () => {
    // Update this logic based on your application requirements
    if (role === "patient") {
      return `/patients/login?redirect=${pathname}`;
    } else if (role === "doctor") {
      return `/doctors/login?redirect=${pathname}`;
    } else {
      // Default to patient login if role is not explicitly set
      return `/patients/login?redirect=${pathname}`;
    }
  };

  const loginPath = getLoginPath();

  if (!ready) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Loading...</h1>
            <p>
              Please wait while we are checking your credentials and loading the
              application.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}
