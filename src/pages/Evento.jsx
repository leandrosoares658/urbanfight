import Seo from '../components/Seo.jsx';
import { EventoJsonLd } from '../components/JsonLd.jsx';
import { useParams, Link } from 'react-router-dom';
import { buscarEvento, formatarData } from '../data/eventos.js';
import { contato } from '../data/site.js';

export default function Evento() {
  const { slug } = useParams();
  const evento = buscarEvento(slug);

  if (!evento) {
    return (
      <main className="container page">
        <Seo titulo="Evento não encontrado" descricao="Este evento não está mais disponível." caminho="/eventos" />
        <h1 className="section-title">EVENTO NÃO ENCONTRADO</h1>
        <Link className="btn" to="/eventos">Ver todos os eventos</Link>
      </main>
    );
  }

  return (
    <main className="container page">
      <Seo
        titulo={evento.title}
        descricao={evento.resumo}
        caminho={`/eventos/${evento.slug}`}
        imagem={evento.imagem}
      />
      <EventoJsonLd evento={evento} />
      <article className="evento-detalhe">
        <time className="evento__data" dateTime={evento.data}>{formatarData(evento.data)}</time>
        <h1 className="section-title">{evento.title}</h1>
        {evento.imagem && <img src={evento.imagem} alt="" />}
        {evento.paragrafos.map((p, i) => <p key={i}>{p}</p>)}
        <div className="evento-detalhe__acoes">
          <a className="btn" href={contato.whatsapp} target="_blank" rel="noopener">Quero participar</a>
          <Link className="btn btn--vazado" to="/eventos">Voltar</Link>
        </div>
      </article>
    </main>
  );
}
