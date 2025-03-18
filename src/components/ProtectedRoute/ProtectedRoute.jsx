import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAuthUser, selectIsRefreshing } from "../../redux/auth/selectors";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectAuthUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isAuthChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isRefreshing) {
      setAuthChecked(true);
    }
  }, [user, isRefreshing]);

  if (!isAuthChecked || isRefreshing) {
    return <p>Loading...</p>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
