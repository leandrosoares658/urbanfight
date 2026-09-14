import { Link } from 'react-router-dom';
import { contato } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Link className="logo logo--footer" to="/" aria-label="Urban Fight - Início">
            <img src="/img/logo.png" alt="" />
          </Link>

          <nav className="footer__nav" aria-label="Rodapé">
            <Link to="/modalidades">Modalidades</Link>
            <Link to="/historia">História</Link>
            <Link to="/eventos">Eventos</Link>
            <Link to="/planos">Planos</Link>
            <a className="btn btn--pill" href={contato.whatsapp} target="_blank" rel="noopener">Treine Conosco</a>
          </nav>

          <div className="footer__social">
            <a href={contato.instagram} target="_blank" rel="noopener" aria-label="Instagram da Urban Fight">
              <svg viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="#e1306c" />
              </svg>
            </a>
            <a href={contato.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp da Urban Fight">
              <svg viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="footer__copy">
          © {new Date().getFullYear()} Urban Fight. Todos os direitos reservados.<br />
          Desenvolvido por <a href="https://leandrosoarespereira.com" target="_blank" rel="noopener">Leandro Soares</a>
        </p>
      </div>
    </footer>
  );
}
