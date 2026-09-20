// Contatos ficam aqui; horários e preços são editados pelo painel em /admin.
import planosJson from '../content/config/planos.json';

export const contato = {
  whatsapp: 'https://wa.me/5538991096059',
  instagram: 'https://www.instagram.com/urbanfight_oficial/',
  mapaEmbed:
    'https://www.google.com/maps?q=Urban+Fight+Academia+de+Artes+Marciais+Montes+Claros+MG&output=embed',
};

export const planos = planosJson.planos;

const boxe =
  'O boxe é muito mais do que desferir golpes. É uma atividade dinâmica que combina alta queima calórica, melhora do condicionamento cardiovascular e alívio do estresse. Nas nossas aulas, você aprenderá técnicas refinadas de soco, esquiva e movimentação de pernas, tudo em um ambiente seguro e acolhedor.';

const kick = 
  'O Kickboxing é uma arte marcial dinâmica que combina socos do boxe tradicional com chutes potentes de artes marciais orientais, ideal para quem busca condicionamento físico, defesa pessoal ou alta performance no esporte. '

const krav = 
  'Krav Maga é um sistema de defesa pessoal criado em Israel que ensina qualquer pessoa a se defender de agressões reais, independentemente de idade, sexo ou força física' 

const tkd = 
  'O taekwondo é uma arte marcial de origem coreana e esporte olímpico que se destaca pelo uso potente e veloz de chutes altos, e no desenvolvimento integreado do corpo e da mente.'

const jkd = 
  'O Jeet Kune Do não é apenas uma arte marcial tradicional, mas um método científico de combate e desenvolvimento pessoal. Criado pelo mestre Bruce Lee, o JKD dispensa padrões rígidos e formas engessadas, focando na eficiência máxima com o mínimo de energia e tempo.'

const bjj = 
  'Transforme seu corpo e mente com o Jiu-Jitsu Brasileiro. Na Urban Fight, oferecemos um ambiente seguro e acolhedor para quem busca aprender defesa pessoal, melhorar a saúde física e desenvolver a autoconfiança.'

const sambo = 
  'O SAMBO é uma arte marcial e sistema de combate completo, desenvolvido na União Soviética no início do século XX. O termo vem da expressão Samozashchita Bez Oruzhiya, que se traduz literalmente como "autodefesa sem armas". Reconhecido mundialmente por sua eficácia, o SAMBO combina as técnicas mais eficientes de diversas lutas tradicionais do mundo, como o Judô, o Jiu-Jitsu e estilos de wrestling da Ásia Central.'


// Horários vêm do painel (/admin → Horários das aulas), um JSON por modalidade
const horariosJson = import.meta.glob('../content/horarios/*.json', { eager: true, import: 'default' });

function horariosDe(id) {
  const arquivo = horariosJson[`../content/horarios/${id}.json`];
  return arquivo?.horarios?.filter((h) => h.dia && h.aulas?.length) ?? [];
}

const listaModalidades = [
  { id: 'boxe', nome: 'BOXE', label: 'Boxe', imagem: '/img/boxe.jpg', descricao: boxe },
  { id: 'kickboxing', nome: 'KICKBOXING', label: 'Kickboxing', imagem: '/img/kickboxing.jpg', descricao: kick },
  { id: 'krav-maga', nome: 'KRAV-MAGA', label: 'Krav Maga', imagem: '/img/krav-maga.jpg', descricao: krav },
  { id: 'taekwondo', nome: 'TAEKWONDO', label: 'Taekwondo', imagem: '/img/taekwondo.jpg', descricao: tkd },
  { id: 'jeet-kune-do', nome: 'JEET KUNE DO', label: 'Jeet Kune Do', imagem: '/img/jeet-kune-do.jpg', descricao: jkd },
  { id: 'bjj', nome: 'JIU JITSU', label: 'Jiu Jitsu', imagem: '/img/bjj.jpg', descricao: bjj },
  { id: 'sambo', nome: 'SAMBO', label: 'Sambo', imagem: '/img/sambo.jpg', descricao: sambo },
];

export const modalidades = listaModalidades.map((m) => ({ ...m, horarios: horariosDe(m.id) }));

export const historia = `A Urban Fight nasceu em 2022, em Montes Claros, da vontade do mestre Andre de criar um espaço onde qualquer pessoa pudesse aprender artes marciais: do iniciante que nunca calçou uma luva ao atleta que compete.

Hoje somos uma escola com 7 modalidades e mais de 5000 alunos, onde o treino sério anda junto com o respeito e a convivência. Aqui ninguém treina sozinho: cada aluno evolui no próprio ritmo, com acompanhamento de perto.

Quem está à frente?

Mestre Andre treina boxe, kickboxing, krav-maga, jeet-kune-do, jiu-jitsu brasileiro e sambo há mais de 10 anos, já trabalhou na área de segurança prisional e hoje além de ministrar aulas, possui sua própria empresa de segurança
e ensina desde 2022. [Uma ou duas frases: títulos, competições, onde se formou, o que o motiva a ensinar.]

Certificações

[Certificação] — [entidade], [ano]
[Certificação] — [entidade], [ano]
[Certificação] — [entidade], [ano]

Quer conhecer a academia? Agende uma aula experimental.`;
