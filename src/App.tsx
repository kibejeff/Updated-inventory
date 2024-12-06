import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import WorkersPage from './pages/WorkersPage';
import ProfilePage from './pages/ProfilePage';
import CategoryManagementPage from './pages/CategoryManagementPage';
import CheckoutHistoryPage from './pages/CheckoutHistoryPage';
import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          {user?.role === 'admin' && (
            <>
              <Route path="workers" element={<WorkersPage />} />
              <Route path="categories" element={<CategoryManagementPage />} />
            </>
          )}
          <Route path="checkout-history" element={<CheckoutHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;