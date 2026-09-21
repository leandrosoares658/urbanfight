import Seo from '../components/Seo.jsx';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { modalidades } from '../data/site.js';

export default function Modalidades() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <main className="container page">
      <Seo
        titulo="Modalidades"
        descricao="Conheça as modalidades da Urban Fight em Montes Claros - MG: Boxe, Kickboxing, Krav-Maga, Taekwondo, Jeet Kune Do, Jiu Jitsu e Sambo."
        caminho="/modalidades"
      />
      <h1 className="section-title">MODALIDADES</h1>
      <div className="modalidades-lista">
        {modalidades.map((m) => (
          <article className="modalidade" id={m.id} key={m.id}>
            <img src={m.imagem} alt={m.label} />
            <div className="modalidade__texto">
              <h2>{m.nome}</h2>
              <p>{m.descricao}</p>
              <Link className="btn btn--full" to={`/planos#${m.id}`}>Ver Horários {m.label}</Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
