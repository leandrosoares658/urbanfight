import Seo from '../components/Seo.jsx';
import { historia } from '../data/site.js';

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
        <p>{historia}</p>
      </div>
    </main>
  );
}
