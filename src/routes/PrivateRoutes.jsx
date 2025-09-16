import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

function PrivateRoute({ role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}

export default PrivateRoute;
