import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Modalidades from './pages/Modalidades.jsx';
import Historia from './pages/Historia.jsx';
import Planos from './pages/Planos.jsx';
import Eventos from './pages/Eventos.jsx';
import Evento from './pages/Evento.jsx';
import { eventos } from './data/eventos.js';

// Sobe a página ao trocar de rota (a menos que exista um #hash para rolar)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header home={pathname === '/'} />
      <Outlet />
      <Footer />
    </>
  );
}

// Lista de rotas: o vite-react-ssg gera um HTML estático para cada uma
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'modalidades', element: <Modalidades /> },
      { path: 'historia', element: <Historia /> },
      { path: 'planos', element: <Planos /> },
      { path: 'eventos', element: <Eventos /> },
      {
        path: 'eventos/:slug',
        element: <Evento />,
        // um HTML por evento publicado no painel
        getStaticPaths: () => eventos.map((e) => `eventos/${e.slug}`),
      },
      { path: '*', element: <Home /> },
    ],
  },
];
