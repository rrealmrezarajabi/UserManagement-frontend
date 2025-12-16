import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardLayout from "../layout/DashBoardLayout";
import UserListPage from "../features/users/pages/UserListPage";
import HomePage from "../features/dashboard/pages/HomePage";
import CreateUserPage from "../features/users/pages/CreateUserPage";
const AppRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="create" element={<CreateUserPage/>}/>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoute;
