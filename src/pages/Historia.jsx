import Seo from '../components/Seo.jsx';
import TextoRico from '../components/TextoRico.jsx';
import { historia, federacoes } from '../data/site.js';

export default function Historia() {
  return (
    <main className="container page">
      <Seo
        titulo="Nossa História"
        descricao="A história da Urban Fight, escola de artes marciais em Montes Claros - MG, e as certificações de quem está à frente das aulas."
        caminho="/historia"
      />
      <h1 className="section-title">NOSSA HISTÓRIA</h1>

      <div className="historia">
        <TextoRico texto={historia} />
      </div>

      {federacoes.length > 0 && (
        <ul className="federacoes" aria-label="Federações e instituições">
          {federacoes.map((f) => {
            const logo = <img src={f.imagem} alt={f.nome} loading="lazy" />;
            return (
              <li className="federacao" key={f.nome}>
                {f.site ? (
                  <a href={f.site} target="_blank" rel="noopener" title={f.nome}>{logo}</a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
