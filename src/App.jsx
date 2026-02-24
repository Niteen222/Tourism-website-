import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Places } from './pages/Places';
import { Hotels } from './pages/Hotels';
import { Food } from './pages/Food';
import { Taxis } from './pages/Taxis';
import { Guides } from './pages/Guides';

// Auth Guard for protected routes
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="places" element={<Places />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="food" element={<Food />} />
            <Route path="taxis" element={<Taxis />} />
            <Route path="guides" element={<Guides />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
