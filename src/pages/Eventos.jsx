import { Link } from 'react-router-dom';
import { eventos, formatarData } from '../data/eventos.js';

export default function Eventos() {
  return (
    <main className="container page">
      <h1 className="section-title">EVENTOS</h1>

      {eventos.length === 0 ? (
        <p className="vazio">Nenhum evento publicado no momento.</p>
      ) : (
        <div className="eventos-lista">
          {eventos.map((e) => (
            <article className="evento" key={e.slug}>
              {e.imagem && <img src={e.imagem} alt="" />}
              <div className="evento__texto">
                <time className="evento__data" dateTime={e.data}>{formatarData(e.data)}</time>
                <h2>{e.title}</h2>
                <p>{e.resumo}</p>
                <Link className="btn" to={`/eventos/${e.slug}`}>Ver detalhes</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
