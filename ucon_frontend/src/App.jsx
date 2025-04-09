import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/authentication/Register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
