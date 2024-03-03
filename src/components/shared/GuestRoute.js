import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/auth/selectors";
import { Navigate, Route } from "react-router-dom";

export default function GuestRoute({ children, ...props }) {
  const isGuest = !useSelector(selectIsAuthenticated);

  return <Route {...props}>{isGuest ? children : <Navigate to="/" />}</Route>;
}
