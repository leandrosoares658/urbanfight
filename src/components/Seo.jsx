import { Head } from 'vite-react-ssg';
import { site } from '../data/site.js';

/**
 * Título, descrição e tags de compartilhamento (WhatsApp, Facebook, X).
 * Como o build é estático, isso vai para o HTML — robôs e o WhatsApp leem.
 */
export default function Seo({ titulo, descricao, caminho = '/', imagem }) {
  const tituloCompleto = caminho === '/' ? titulo : `${titulo} | ${site.nome}`;
  const url = site.url + caminho;
  const capa = site.url + (imagem || site.imagemPadrao);

  return (
    <Head>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.nome} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={capa} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descricao} />
      <meta name="twitter:image" content={capa} />
    </Head>
  );
}
