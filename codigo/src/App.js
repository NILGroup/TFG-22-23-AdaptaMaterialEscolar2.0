import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Spinner} from './components/Spinner/Spinner';
import {Inicio} from './pages/Inicio';
import {Ayuda} from './pages/Ayuda';
import {Contacto} from './pages/Contacto'


//Supense generar un html que se muestre mientras espera a los lazy que estan dentro
function App() {
  return (
    <Router>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Suspense>
  </Router>
  );
}
export default App;
