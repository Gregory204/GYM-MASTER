import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// User Components
import Profile from './components/profile/Profile';
import AddProgress from './components/progress/AddProgress';
import ProgressList from './components/progress/ProgressList';
import RewardsList from './components/rewards/RewardsList';

// Protected Route Component
const ProtectedRoute = ({ children }) => { // This component will be used to protect routes that require authentication 
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />; // If the user is not authenticated, they will be redirected to the login page
  }
  
  return children;
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <AddProgress />
          <div className="mt-4">
            <ProgressList />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Quick Stats</h4>
            </div>
            <div className="card-body">
              <p>Welcome to your fitness dashboard!</p>
              <p>Track your workouts, monitor your progress, and earn rewards as you improve.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4">Track Your Fitness Journey</h1>
          <p className="lead">
            Welcome to Gym Master, your personal AI-powered fitness companion.
          </p>
          <div className="d-grid gap-2 d-md-flex mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-md-2">Get Started</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg">Login</Link>
          </div>
        </div>
        <div className="col-md-6 text-center">
          <div className="display-1" style={{ fontSize: '150px' }}>🏋️</div>
        </div>
      </div>
    </div>
  );
};

// Import Link for Home component
import { Link } from 'react-router-dom';

function App() { // The App component contains the main layout of the application
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/progress" element={
                <ProtectedRoute>
                  <div className="container mt-4">
                    <AddProgress />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/progress/history" element={
                <ProtectedRoute>
                  <div className="container mt-4">
                    <ProgressList />
                  </div>
                </ProtectedRoute>
              } />
              <Route path="/rewards" element={
                <ProtectedRoute>
                  <RewardsList />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;