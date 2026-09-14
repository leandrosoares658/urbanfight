import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { contato } from '../data/site.js';

export default function Header({ home }) {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <header className={`header${home ? ' header--home' : ''}`}>
      <div className="container header__inner">
        <Link className="logo" to="/" aria-label="Urban Fight - Início" onClick={fechar}>
          <img src="/img/logo.png" alt="Urban Fight — Escola de Artes Marciais" />
        </Link>

        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          aria-controls="menu"
          onClick={() => setAberto((v) => !v)}
        >
          ☰
        </button>

        <nav className={`nav${aberto ? ' is-open' : ''}`} id="menu" aria-label="Principal">
          <NavLink to="/modalidades" onClick={fechar}>Modalidades</NavLink>
          <NavLink to="/historia" onClick={fechar}>História</NavLink>
          <NavLink to="/eventos" onClick={fechar}>Eventos</NavLink>
          <NavLink to="/planos" onClick={fechar}>Planos</NavLink>
          <a className="btn btn--pill" href={contato.whatsapp} target="_blank" rel="noopener">Treine Conosco</a>
        </nav>
      </div>
    </header>
  );
}
