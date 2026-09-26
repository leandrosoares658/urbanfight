// Contatos ficam aqui; horários e preços são editados pelo painel em /admin.
import planosJson from '../content/config/planos.json';

// Dados usados no SEO (título, compartilhamento e ficha do Google).
// ATENÇÃO: confira o endereço e o domínio antes de publicar.
export const site = {
  nome: 'Urban Fight',
  url: 'https://urbanfight.netlify.app',            // domínio final, sem barra no fim
  descricao:
    'Escola de artes marciais em Montes Claros - MG: Boxe, Kickboxing, Krav-Maga, Taekwondo, Jeet Kune Do, Jiu Jitsu e Sambo.',
  telefone: '+5538991096059',
  imagemPadrao: '/img/og-image.jpg',                 // 1200x630 px
  endereco: {
    rua: '[rua e número]',
    cidade: 'Montes Claros',
    estado: 'MG',
    cep: '[CEP]',
  },
};

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
  'O Kickboxing é uma junção do Karatê de contato ( Kyokushin)+ Muay Thay + Boxe. Sendo rápido, versátil e dinâmico, trazendo em seu contexto sempre muito volume e intensidade, ideal para quem busca condicionamento físico, defesa pessoal ou alta performance no esporte. '

const krav = 
  'Krav Maga é um sistema de defesa pessoal criado e usado pelo exercito de Israel, que ensina qualquer pessoa a se defender de agressões reais, independentemente de idade, sexo ou força física' 

const tkd = 
  'O taekwondo é uma arte marcial de origem coreana e esporte olímpico que se destaca pelo uso potente e veloz de chutes altos, e no desenvolvimento integreado do corpo e da mente.'

const jkd = 
  'O Jeet Kune Do não é apenas uma arte marcial tradicional, mas um método científico de combate e desenvolvimento pessoal. Criado pelo mestre Bruce Lee, o JKD dispensa padrões rígidos e formas engessadas, focando na eficiência máxima com o mínimo de energia e tempo.'

const bjj = 
  'Transforme seu corpo e mente com o Jiu-Jitsu Brasileiro. Na Urban Fight, oferecemos um ambiente seguro e acolhedor para quem busca aprender defesa pessoal, melhorar a saúde física e desenvolver a autoconfiança.'

const sambo = 
  'O Sambo é uma arte marcial e sistema de combate completo, desenvolvido na União Soviética no início do século XX. O termo vem da expressão Samozashchita Bez Oruzhiya, que se traduz literalmente como "autodefesa sem armas". Reconhecido mundialmente por sua eficácia após lutadores do UFC como Fedor Emelianenko, Khabib Nurmagomedov e Islam Makhachev se tornarem lendas. O Sambo combina as técnicas mais eficientes de diversas lutas tradicionais do mundo, como o Judô/Jujutsu japônes e estilos americano/russo de Wrestling.'


// Horários vêm do painel (/admin → Horários das aulas), num arquivo só:
// uma linha por aula, com modalidade, dia, horário, turma e espaço.
import aulasJson from '../content/horarios/aulas.json';

export const DIAS_SEMANA = [
  'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira',
  'Sexta-feira', 'Sábado', 'Domingo',
];

// Agrupa as aulas de uma modalidade por dia, na ordem da semana
function horariosDe(id) {
  const aulas = (aulasJson.aulas ?? []).filter((a) => a.modalidade === id && a.dia && a.horario);

  return DIAS_SEMANA
    .map((dia) => ({
      dia,
      aulas: aulas
        .filter((a) => a.dia === dia)
        .sort((a, b) => a.horario.localeCompare(b.horario))
        .map((a) => ({ horario: a.horario, turma: a.turma || '', espaco: a.espaco || '' })),
    }))
    .filter((d) => d.aulas.length > 0);
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

// Federações e instituições que certificam o Mestre André.
// As imagens ficam em public/img/federacoes/ — use PNG com fundo transparente
// quando possível; o card branco garante que qualquer logo apareça bem.
export const federacoes = [
  { nome: 'Federação Mineira de Kickboxing', imagem: '/img/federacoes/fmkb.png', site: '' },
  { nome: 'Confederação Brasileira de Boxe', imagem: '/img/federacoes/cbboxe.png', site: '' },
  { nome: 'Federação de Jeet Kune Do', imagem: '/img/federacoes/abjkd_logo.png', site: '' },
  { nome: 'Krav Maga', imagem: '/img/federacoes/kravmaga.png', site: '' },
];

export const historia = `A **Urban Fight nasceu em 2022, em Montes Claros**, fruto de uma trajetória construída ao longo de anos de dedicação às artes marciais, busca por conhecimento e constante evolução.

O Mestre André teve seu primeiro contato com as artes marciais ainda aos **9 anos de idade**, quando começou a praticar Kung Fu. Depois de um período de treinamento, acabou seguindo outros caminhos e se afastando dos tatames. Anos mais tarde, já atuando na área de **segurança pública**, percebeu novamente a importância das artes marciais em sua vida e decidiu retomar sua jornada.

Ao pesquisar sobre o Kung Fu e a trajetória de **Bruce Lee**, conheceu o **Jeet Kune Do**, modalidade na qual encontrou uma nova forma de enxergar e praticar as artes marciais. Em busca de ampliar seus conhecimentos, especialmente na área de defesa pessoal, iniciou também seus estudos no **Krav Maga**.

A busca por conhecimento levou o Mestre André a viajar por diferentes cidades e estados, incluindo **São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, Alfenas e Poços de Caldas**, treinando com diferentes professores e especialistas e adquirindo experiências que contribuíram para sua formação.

Com o passar dos anos, sua trajetória também se expandiu para o **Boxe e o Kickboxing**, modalidades nas quais aprofundou sua formação como atleta e professor. Ao longo desse caminho, conquistou **graduações, títulos e certificações**, incluindo a formação como treinador de Boxe e a faixa-preta de Kickboxing, além das graduações nas demais modalidades em que atua.

Em 2022, todo esse conhecimento e experiência deram origem à **Urban Fight**. Mais do que criar uma academia, o objetivo era construir um espaço onde pessoas de diferentes níveis pudessem encontrar nas artes marciais uma ferramenta para desenvolver **disciplina, confiança, condicionamento físico, técnica e autoconhecimento**.

E essa busca por evolução continua até hoje. Mesmo como professor e fundador da academia, o Mestre André permanece como aluno, atualmente treinando **Jiu-Jitsu e Taekwondo**, porque acreditamos que **quem ensina também precisa continuar aprendendo**.

Essa trajetória é construída não apenas dentro dos tatames, mas também por meio de **formação, graduação e reconhecimento junto a federações e organizações especializadas nas diferentes modalidades praticadas**.

### Formação que faz parte da nossa história

Conheça algumas das **federações e instituições que certificam e reconhecem a formação dos professores da Urban Fight:**`;
