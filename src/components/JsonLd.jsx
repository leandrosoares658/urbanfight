import { Head } from 'vite-react-ssg';
import { site, contato, modalidades } from '../data/site.js';

const DIAS = {
  'Segunda-feira': 'Monday',
  'Terça-feira': 'Tuesday',
  'Quarta-feira': 'Wednesday',
  'Quinta-feira': 'Thursday',
  'Sexta-feira': 'Friday',
  'Sábado': 'Saturday',
  'Domingo': 'Sunday',
};

// Descreve a academia para o Google (pode gerar resultado com mapa, nota e horário)
export function NegocioJsonLd() {
  const dias = new Set();
  modalidades.forEach((m) => m.horarios.forEach((h) => dias.add(DIAS[h.dia])));

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: site.nome,
    description: site.descricao,
    url: site.url,
    image: site.url + site.imagemPadrao,
    telephone: site.telefone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.endereco.rua,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.estado,
      postalCode: site.endereco.cep,
      addressCountry: 'BR',
    },
    openingHours: [...dias].filter(Boolean).map((d) => `${d.slice(0, 2)}`),
    sameAs: [contato.instagram].filter(Boolean),
    priceRange: '$$',
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(dados)}</script>
    </Head>
  );
}

// Descreve um evento (pode aparecer como card de evento na busca)
export function EventoJsonLd({ evento }) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: evento.title,
    startDate: evento.data,
    description: evento.resumo,
    image: evento.imagem ? site.url + evento.imagem : site.url + site.imagemPadrao,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: site.nome,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.endereco.rua,
        addressLocality: site.endereco.cidade,
        addressRegion: site.endereco.estado,
        addressCountry: 'BR',
      },
    },
    organizer: { '@type': 'Organization', name: site.nome, url: site.url },
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(dados)}</script>
    </Head>
  );
}
