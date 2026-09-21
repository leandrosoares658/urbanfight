import Seo from '../components/Seo.jsx';
import { useLocation } from 'react-router-dom';
import { planos, modalidades } from '../data/site.js';
import HorarioModalidade from '../components/HorarioModalidade.jsx';

export default function Planos() {
  const { hash } = useLocation();
  const alvo = hash.replace('#', '');

  return (
    <main className="container page">
      <Seo
        titulo="Planos e Horários"
        descricao="Planos mensal, semestral e anual e horários das aulas de cada modalidade da Urban Fight, em Montes Claros - MG."
        caminho="/planos"
      />
      <h1 className="section-title">PLANOS</h1>

      <div className="planos-grid">
        {planos.map((p) => (
          <article className="plano" key={p.nome}>
            <h2>{p.nome}</h2>
            <ul>{p.itens.map((i) => <li key={i}>{i}</li>)}</ul>
          </article>
        ))}
      </div>

      <section className="horarios-lista" aria-label="Horários das aulas">
        {modalidades.map((m) => (
          <HorarioModalidade key={m.id} modalidade={m} abrirInicial={alvo === m.id} />
        ))}
      </section>
    </main>
  );
}
