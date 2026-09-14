// Lê os arquivos .md criados pelo painel (/admin) na pasta src/content/eventos.
// O Vite embute todos eles no build — não precisa de banco nem de API.

const arquivos = import.meta.glob('../content/eventos/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Lê o bloco --- ... --- do topo do arquivo (frontmatter simples, chave: valor)
function parseFrontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { dados: {}, corpo: texto.trim() };

  const dados = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const sep = linha.indexOf(':');
    if (sep === -1) continue;
    const chave = linha.slice(0, sep).trim();
    let valor = linha.slice(sep + 1).trim().replace(/^['"]|['"]$/g, '');
    if (valor === 'true' || valor === 'false') dados[chave] = valor === 'true';
    else dados[chave] = valor;
  }
  return { dados, corpo: m[2].trim() };
}

function slugDoCaminho(caminho) {
  return caminho.split('/').pop().replace(/\.md$/, '');
}

export const eventos = Object.entries(arquivos)
  .map(([caminho, texto]) => {
    const { dados, corpo } = parseFrontmatter(texto);
    return {
      slug: slugDoCaminho(caminho),
      title: dados.title || 'Sem título',
      data: dados.data || '',
      imagem: dados.imagem || '',
      resumo: dados.resumo || '',
      destaque: dados.destaque !== false,
      // parágrafos separados por linha em branco
      paragrafos: corpo.split(/\r?\n\s*\r?\n/).filter(Boolean),
    };
  })
  .sort((a, b) => b.data.localeCompare(a.data)); // mais recentes primeiro

export const eventosDestaque = eventos.filter((e) => e.destaque).slice(0, 3);

export function buscarEvento(slug) {
  return eventos.find((e) => e.slug === slug);
}

export function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}
