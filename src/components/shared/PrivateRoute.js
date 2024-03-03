import { Route } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/auth/selectors";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, ...props }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route {...props}>
      {isAuthenticated ? children : <Navigate to="/login" />}
    </Route>
  );
}
