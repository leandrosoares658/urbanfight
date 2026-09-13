import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Modalidades from './pages/Modalidades.jsx';
import Historia from './pages/Historia.jsx';
import Planos from './pages/Planos.jsx';

// Sobe a página ao trocar de rota (a menos que exista um #hash para rolar)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header home={pathname === '/'} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modalidades" element={<Modalidades />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
