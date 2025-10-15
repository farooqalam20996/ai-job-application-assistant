// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  if (initializing) return null; // or a loader

  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


// 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