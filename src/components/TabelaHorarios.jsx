// Grade semanal: uma coluna por dia, cada aula com horário, turma e espaço.
// Recebe `horarios`: [{ dia, aulas: [{ horario, turma, espaco }] }]
export default function TabelaHorarios({ horarios }) {
  if (!horarios?.length) {
    return <p className="vazio">Horários ainda não cadastrados.</p>;
  }

  return (
    <div className="tabela-wrap">
      <table className="horarios">
        <thead>
          <tr>{horarios.map((h) => <th key={h.dia}>{h.dia}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            {horarios.map((h) => (
              <td key={h.dia}>
                {h.aulas.map((a, i) => (
                  <div className="aula" key={`${a.horario}-${a.turma}-${i}`}>
                    <span className="aula__hora">{a.horario}</span>
                    {(a.turma || a.espaco) && (
                      <span className="aula__info">
                        {a.turma}
                        {a.turma && a.espaco ? ' · ' : ''}
                        {a.espaco && `Espaço ${a.espaco}`}
                      </span>
                    )}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
