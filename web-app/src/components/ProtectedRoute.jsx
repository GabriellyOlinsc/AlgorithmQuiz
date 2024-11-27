import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {


  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp > currentTime) {
        if (allowedRoles.includes(decoded.role)) {
          return children;
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        localStorage.clear();
        return <Navigate to="/login" replace />;
      }
    } catch (err) {
      console.log(err)
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  }

  return <Navigate to="/login" replace />;

};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
