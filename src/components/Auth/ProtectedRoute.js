// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  // const isloggedin = useSelector((state) => state.app.isloggedin);
  const isloggedin = localStorage.getItem("isloggedin");

  // return isloggedin ? <Outlet /> : <Navigate to="/sign-in" />;

  const CheckAccess = () => {
    const user = useSelector((state) => state.app.user);

    if (user && user.role && role.includes("ADMIN")) {
      return true;
    } else if (user && user.role && role.includes(user.role)) {
      return true;
    } else {
      return false;
    }
  };

  if (isloggedin) {
    if (CheckAccess()) {
      return <Outlet />;
    } else {
      return <Navigate to="/no-access" />;
    }
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default ProtectedRoute;
