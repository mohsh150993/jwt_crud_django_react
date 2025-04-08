// src/pages/Dashboard.jsx
import { useAuth } from '../auth/authContext';

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
