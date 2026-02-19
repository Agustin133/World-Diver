import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Top5 from './pages/Top5';
import Services from './pages/Services';
import About from './pages/About';
import World from './pages/World';
import Conservation from './pages/Conservation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Memberships from './pages/Memberships';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-ocean-light to-opacity-10">
            <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorar" element={<Explore />} />
            <Route path="/top5" element={<Top5 />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/mundo" element={<World />} />
            <Route path="/conservacion" element={<Conservation />} />
            <Route path="/membresias" element={<Memberships />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/acerca-de" element={<About />} />
          </Routes>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
