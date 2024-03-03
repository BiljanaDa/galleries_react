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
          path="/galleries/me"
          element={
            <AppGalleries selfId={isAuthenticated ? activeUser?.id : null} />
          }
        />
        {/* <Route path="/galleries/create" element={<CreateGallery />} /> */}
        <Route path="/galleries/:id" element={<AppGalleries />} />
        {/* <Route path="/authors/:id" element={<GalleriesApp />} /> */}
        {/* <Route path="/edit-gallery/:id" element={<CreateGallery />} /> */}
      </Routes>
    </div>
  );
}

export default App;
