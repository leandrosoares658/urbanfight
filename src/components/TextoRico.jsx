/* Renderiza um texto simples com:
     **negrito**            -> <strong>
     ### Subtítulo          -> <h2>
     linha em branco        -> novo parágrafo
   Nada de HTML cru: o texto vem do painel, então é tratado como texto. */

function comNegrito(linha) {
  // divide mantendo os trechos entre ** ** para virarem <strong>
  return linha.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith('**') && parte.endsWith('**') ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      parte
    )
  );
}

export default function TextoRico({ texto }) {
  const blocos = String(texto || '').split(/\r?\n\s*\r?\n/).filter(Boolean);

  return blocos.map((bloco, i) => {
    const limpo = bloco.trim();

    if (limpo.startsWith('### ')) {
      return <h2 key={i}>{comNegrito(limpo.slice(4))}</h2>;
    }
    if (limpo.startsWith('## ')) {
      return <h2 key={i}>{comNegrito(limpo.slice(3))}</h2>;
    }

    return <p key={i}>{comNegrito(limpo)}</p>;
  });
}
