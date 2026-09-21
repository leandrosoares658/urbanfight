// Gera dist/sitemap.xml depois do build, a partir das rotas fixas
// e dos eventos publicados pelo painel.
import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const URL_SITE = 'https://urbanfight.netlify.app'; // igual ao site.url em src/data/site.js

const rotasFixas = [
  { caminho: '/', prioridade: '1.0' },
  { caminho: '/modalidades', prioridade: '0.9' },
  { caminho: '/planos', prioridade: '0.9' },
  { caminho: '/eventos', prioridade: '0.7' },
  { caminho: '/historia', prioridade: '0.6' },
];

const pastaEventos = join(process.cwd(), 'src/content/eventos');
const eventos = existsSync(pastaEventos)
  ? readdirSync(pastaEventos)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ caminho: `/eventos/${f.replace(/\.md$/, '')}`, prioridade: '0.5' }))
  : [];

const hoje = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...rotasFixas, ...eventos]
  .map(
    ({ caminho, prioridade }) => `  <url>
    <loc>${URL_SITE}${caminho}</loc>
    <lastmod>${hoje}</lastmod>
    <priority>${prioridade}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(process.cwd(), 'dist/sitemap.xml'), xml);
console.log(`sitemap.xml gerado com ${rotasFixas.length + eventos.length} URLs`);
