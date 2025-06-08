import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('admin_jwt_token');
  
  if (!adminToken) {
    return <Navigate to="/dashboard/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute; 