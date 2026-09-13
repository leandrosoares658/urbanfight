// Edite aqui: contatos, modalidades, planos e horários.

export const contato = {
  whatsapp: 'https://wa.me/55SEUNUMERO',
  instagram: 'https://instagram.com/SEUPERFIL',
  mapaEmbed:
    'https://www.google.com/maps?q=Urban+Fight+Academia+de+Artes+Marciais+Montes+Claros+MG&output=embed',
};

export const planos = [
  { nome: 'Mensal', itens: ['R$ 140,00 / modalidade'] },
  {
    nome: 'Semestre',
    itens: [
      'R$ 125,00/mês - 1 modalidade',
      'R$ 190,00/mês - 2 modalidades',
      'R$ 270,00/mês - 3 modalidades',
      'R$ 330,00/mês - 4 modalidades',
      'R$ 400,00/mês - 5 modalidades',
    ],
  },
  {
    nome: 'Anual',
    itens: [
      'R$ 115,00/mês - 1 modalidade',
      'R$ 180,00/mês - 2 modalidades',
      'R$ 250,00/mês - 3 modalidades',
      'R$ 300,00/mês - 4 modalidades',
      'R$ 380,00/mês - 5 modalidades',
    ],
  },
];

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// horarios: lista de { dia, aulas: [...] }
// TODO: preencher os horários reais das modalidades além do Boxe
const horariosExemplo = [
  { dia: 'Terça-feira', aulas: ['19:15 - 20:15'] },
  { dia: 'Quinta-feira', aulas: ['19:15 - 20:15'] },
  { dia: 'Sábado', aulas: ['09:00 - 10:00'] },
];

export const modalidades = [
  {
    id: 'boxe',
    nome: 'BOXE',
    label: 'Boxe',
    imagem: '/img/boxe.jpg',
    descricao: lorem,
    horarios: [
      { dia: 'Segunda-feira', aulas: ['08:00 - 09:00', '19:15 - 20:15'] },
      { dia: 'Quarta-feira', aulas: ['19:15 - 20:15'] },
      { dia: 'Quinta-feira', aulas: ['08:00 - 09:00'] },
      { dia: 'Sábado', aulas: ['11:00 - 12:00'] },
    ],
  },
  { id: 'kickboxing', nome: 'KICKBOXING', label: 'Kickboxing', imagem: '/img/kickboxing.jpg', descricao: lorem, horarios: horariosExemplo },
  { id: 'krav-maga', nome: 'KRAV-MAGA', label: 'Krav Maga', imagem: '/img/krav-maga.jpg', descricao: lorem, horarios: horariosExemplo },
  { id: 'taekwondo', nome: 'TAEKWONDO', label: 'Taekwondo', imagem: '/img/taekwondo.jpg', descricao: lorem, horarios: horariosExemplo },
  { id: 'jeet-kune-do', nome: 'JEET KUNE DO', label: 'Jeet Kune Do', imagem: '/img/jeet-kune-do.jpg', descricao: lorem, horarios: horariosExemplo },
];

export const historia = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
