import { Link } from 'react-router-dom';
import { modalidades, contato } from '../data/site.js';
import { eventosDestaque, formatarData } from '../data/eventos.js';

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="Apresentação">
        <div className="hero__texto">
          <ul className="hero__lista">
            {modalidades.map((m) => <li key={m.id}>{m.label}</li>)}
          </ul>
          <a className="btn" href={contato.whatsapp} target="_blank" rel="noopener">Faça parte dessa família</a>
        </div>
        <img className="hero__foto" src="/img/hero-turma.jpg" alt="Alunos da Urban Fight reunidos no tatame" />
      </section>

      <section className="intro">
        <div className="container">
          <h1>Discipline sua mente,<br />movimente o seu corpo.</h1>
          <p>
            Na <strong>Urban Fight</strong>, acreditamos que as artes marciais vão muito além do treino físico,
            sendo um espaço para aprendizado, evolução e convivência. Oferecemos aulas de{' '}
            <strong>Boxe, Kick Boxing, Jeet Kune Do e outras modalidades</strong>, atendendo alunos que nunca
            tiveram contato com as artes marciais antes.
          </p>
        </div>
      </section>

      <section className="instrutores">
        <img className="instrutores__foto" src="/img/boxeador.png" alt="Boxeador em posição de golpe" />
        <div className="instrutores__texto">
          <p>
            Aqui na <strong>Urban Fight</strong> você treina com quem realmente entende.{' '}
            <strong>Nossos instrutores</strong> são <strong>certificados pelas federações oficiais</strong> e
            possuem experiência prática nas modalidades que ensinam, oferecendo{' '}
            <strong>segurança, técnica e evolução real</strong> para cada aluno.
          </p>
          <Link className="btn" to="/historia">Veja mais</Link>
        </div>
      </section>

      <section className="container" aria-labelledby="titulo-modalidades">
        <h2 className="section-title" id="titulo-modalidades">MODALIDADES</h2>
        <div className="modalidades-grid">
          {modalidades.map((m) => (
            <Link className="card" to={`/modalidades#${m.id}`} key={m.id}>
              <img src={m.imagem} alt="" />
              <span>{m.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      {eventosDestaque.length > 0 && (
        <section className="container" aria-labelledby="titulo-eventos">
          <h2 className="section-title" id="titulo-eventos">PRÓXIMOS EVENTOS</h2>
          <div className="eventos-destaque">
            {eventosDestaque.map((e) => (
              <Link className="evento-card" to={`/eventos/${e.slug}`} key={e.slug}>
                {e.imagem && <img src={e.imagem} alt="" />}
                <div className="evento-card__texto">
                  <time className="evento__data" dateTime={e.data}>{formatarData(e.data)}</time>
                  <h3>{e.title}</h3>
                  <p>{e.resumo}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link className="btn" to="/eventos">Ver todos os eventos</Link>
        </section>
      )}

      <section className="container mapa" aria-labelledby="titulo-mapa">
        <h2 id="titulo-mapa">ENCONTRE A URBAN FIGHT EM MONTES CLAROS - MG</h2>
        <iframe
          src={contato.mapaEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa — Urban Fight em Montes Claros"
        />
      </section>
    </main>
  );
}
