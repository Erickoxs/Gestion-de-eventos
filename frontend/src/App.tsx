import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../src/pages/Home'; // Importa el componente Home
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterForm from './pages/Register';
import EventSection from './pages/Events';
import FullEventList from './pages/EventsList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/events/:id" element={<EventSection />} />
            <Route path="/events" element={<FullEventList />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
