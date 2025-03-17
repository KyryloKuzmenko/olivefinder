import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAuthUser, selectIsRefreshing } from "../../redux/auth/selectors";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectAuthUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  console.log("[ProtectedRoute] user:", user, "isRefreshing:", isRefreshing);

  if (isRefreshing) {
    console.log("[ProtectedRoute] isRefreshing => <p>Loading...</p>");
    return <p>Loading...</p>;
  }

  if (!user) {
    console.log("[ProtectedRoute] !user => <Navigate to='/login' />");
    return <Navigate to="/login" />;
  }

  console.log("[ProtectedRoute] user found => rendering children");
  return children;
};

export default ProtectedRoute;
