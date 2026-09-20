// horarios: [{ dia, aulas: [...] }]
// Dias com uma aula só ocupam todas as linhas (rowSpan), como no layout.
export default function TabelaHorarios({ horarios }) {
  if (!horarios?.length) {
    return <p className="vazio">Horários ainda não cadastrados.</p>;
  }

  const linhas = Math.max(...horarios.map((h) => h.aulas.length));

  return (
    <div className="tabela-wrap">
      <table className="horarios">
        <thead>
          <tr>{horarios.map((h) => <th key={h.dia}>{h.dia}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: linhas }, (_, i) => (
            <tr key={i}>
              {horarios.map((h) => {
                if (i === 0 && h.aulas.length === 1) return <td key={h.dia} rowSpan={linhas}>{h.aulas[0]}</td>;
                if (i < h.aulas.length) return <td key={h.dia}>{h.aulas[i]}</td>;
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
