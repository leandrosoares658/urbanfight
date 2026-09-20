// Contatos ficam aqui; horários e preços são editados pelo painel em /admin.
import planosJson from '../content/config/planos.json';

export const contato = {
  whatsapp: 'https://wa.me/55SEUNUMERO',
  instagram: 'https://instagram.com/SEUPERFIL',
  mapaEmbed:
    'https://www.google.com/maps?q=Urban+Fight+Academia+de+Artes+Marciais+Montes+Claros+MG&output=embed',
};

export const planos = planosJson.planos;

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';


// Horários vêm do painel (/admin → Horários das aulas), um JSON por modalidade
const horariosJson = import.meta.glob('../content/horarios/*.json', { eager: true, import: 'default' });

function horariosDe(id) {
  const arquivo = horariosJson[`../content/horarios/${id}.json`];
  return arquivo?.horarios?.filter((h) => h.dia && h.aulas?.length) ?? [];
}

const listaModalidades = [
  { id: 'boxe', nome: 'BOXE', label: 'Boxe', imagem: '/img/boxe.jpg', descricao: lorem },
  { id: 'kickboxing', nome: 'KICKBOXING', label: 'Kickboxing', imagem: '/img/kickboxing.jpg', descricao: lorem },
  { id: 'krav-maga', nome: 'KRAV-MAGA', label: 'Krav Maga', imagem: '/img/krav-maga.jpg', descricao: lorem },
  { id: 'taekwondo', nome: 'TAEKWONDO', label: 'Taekwondo', imagem: '/img/taekwondo.jpg', descricao: lorem },
  { id: 'jeet-kune-do', nome: 'JEET KUNE DO', label: 'Jeet Kune Do', imagem: '/img/jeet-kune-do.jpg', descricao: lorem },
  { id: 'bjj', nome: 'JIU JITSU', label: 'Jiu Jitsu', imagem: '/img/bjj.jpg', descricao: lorem },
  { id: 'sambo', nome: 'SAMBO', label: 'Sambo', imagem: '/img/sambo.jpg', descricao: lorem },
];

export const modalidades = listaModalidades.map((m) => ({ ...m, horarios: horariosDe(m.id) }));

export const historia = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
