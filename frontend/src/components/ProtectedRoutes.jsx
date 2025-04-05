// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return null; // Or a loading spinner
      }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    if (allowedRoles && !allowedRoles.includes(user)) {
      return <Navigate to="/not-found" replace />;
    }
  
    return children;
  };
  

export default ProtectedRoute;
