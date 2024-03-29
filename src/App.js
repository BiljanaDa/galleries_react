import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "./components/NavBar";
import { selectActiveUser } from "./store/auth/selectors";
import { selectIsAuthenticated } from "./store/auth/selectors";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { getActiveUser } from "./store/auth/slice";
import AppGalleries from "./pages/AppGalleries";
import CreateGallery from "./pages/CreateGallery";
import SingleGallery from "./pages/SingleGallery";

function App() {
  const activeUser = useSelector(selectActiveUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getActiveUser());
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/galleries" />} />
        <Route path="/galleries" element={<AppGalleries />} />
        <Route
          path="/galleries/my-galleries"
          element={
            <AppGalleries myId={isAuthenticated ? activeUser?.id : null} />
          }
        />
        <Route path="/create" element={<CreateGallery />} />
        <Route path="/galleries/:id" element={<SingleGallery />} />
        <Route path="/edit-gallery/:id" element={<CreateGallery />} />
        <Route path="/authors/:id" element={<AppGalleries />} />
      </Routes>
    </div>
  );
}

export default App;
