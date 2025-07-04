// src/components/ProtectedRoute.jsx
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Or a loading spinner

  if (!isSignedIn) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}
