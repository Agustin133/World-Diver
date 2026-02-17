import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Top5 from './pages/Top5';
import Services from './pages/Services';
import About from './pages/About';
import World from './pages/World';
import Conservation from './pages/Conservation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-ocean-light to-opacity-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorar" element={<Explore />} />
          <Route path="/top5" element={<Top5 />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/mundo" element={<World />} />
          <Route path="/conservacion" element={<Conservation />} />
          <Route path="/acerca-de" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
