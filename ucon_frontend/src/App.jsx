import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './authentication/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* These are protected urls */}
        <Route path="/" element={<Navigate to="/Register" />} />
        
        {/* These are public urls */}
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
