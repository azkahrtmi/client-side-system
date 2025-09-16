import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoutes";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />

        {/* protected admin */}
        <Route element={<PrivateRoute role="admin" />}>
          <Route
            path="/dashboard-admin"
            element={<AdminDashboard />}
          />
        </Route>

        {/* protected user */}
        <Route element={<PrivateRoute role="user" />}>
          <Route
            path="/dashboard-user"
            element={<UserDashboard />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
