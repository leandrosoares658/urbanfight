import { useState, useEffect, useRef } from 'react';
import TabelaHorarios from './TabelaHorarios.jsx';

export default function HorarioModalidade({ modalidade, abrirInicial }) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (abrirInicial) {
      setAberto(true);
      ref.current?.scrollIntoView({ block: 'start' });
    }
  }, [abrirInicial]);

  const idTabela = `tabela-${modalidade.id}`;

  return (
    <div className="horario" id={modalidade.id} ref={ref}>
      <h2>{modalidade.nome}</h2>
      <button
        className="btn btn--full"
        type="button"
        aria-expanded={aberto}
        aria-controls={idTabela}
        onClick={() => setAberto((v) => !v)}
      >
        {aberto ? 'Ocultar' : 'Ver'} Horários {modalidade.label}
      </button>
      {/* Sempre no HTML (só escondido): assim o Google indexa os horários.
          Renderizar só quando aberto deixaria a tabela fora da página. */}
      <div className="horario__tabela" id={idTabela} hidden={!aberto}>
        <TabelaHorarios horarios={modalidade.horarios} />
      </div>
    </div>
  );
}
