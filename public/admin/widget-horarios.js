/* Widget "horarios-aulas" do painel Urban Fight.
   Faz três coisas na mesma tela:
     1. importar uma planilha (.xlsx ou .csv) com todas as aulas;
     2. baixar um modelo já preenchido com o que está cadastrado;
     3. editar/adicionar/remover aula por aula, à mão.
   A planilha é lida no navegador e descartada — só o JSON é salvo no repositório. */
(function () {
  var ehNavegador = typeof window !== 'undefined';
  var h = ehNavegador ? window.h : null;
  var createClass = ehNavegador ? window.createClass : null;

  var MODALIDADES = [
    { id: 'boxe', label: 'Boxe' },
    { id: 'kickboxing', label: 'Kickboxing' },
    { id: 'krav-maga', label: 'Krav Maga' },
    { id: 'taekwondo', label: 'Taekwondo' },
    { id: 'jeet-kune-do', label: 'Jeet Kune Do' },
    { id: 'bjj', label: 'Jiu Jitsu' },
    { id: 'sambo', label: 'Sambo' },
  ];

  var DIAS = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
  var COLUNAS = ['Modalidade', 'Dia', 'Horário', 'Turma', 'Espaço'];

  // ---------- funções puras (também usadas nos testes) ----------

  function semAcento(texto) {
    return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  // "Jiu Jitsu", "jiu-jitsu", "BJJ" -> 'bjj'
  function idDaModalidade(nome) {
    var alvo = semAcento(nome).replace(/[\s_-]+/g, '');
    var achou = MODALIDADES.find(function (m) {
      return semAcento(m.label).replace(/[\s_-]+/g, '') === alvo || m.id.replace(/-/g, '') === alvo;
    });
    return achou ? achou.id : null;
  }

  // "segunda", "SEG", "Segunda-feira" -> 'Segunda-feira'
  function nomeDoDia(valor) {
    var alvo = semAcento(valor);
    if (!alvo) return null;
    var achou = DIAS.find(function (d) {
      var base = semAcento(d);
      return base === alvo || base.indexOf(alvo) === 0 || alvo.indexOf(base.replace('-feira', '')) === 0;
    });
    return achou || null;
  }

  // Aceita "8:00 - 9:00", "08:00-09:00", "08h00 às 09h00"
  function normalizarHorario(valor) {
    var texto = String(valor || '').replace(/h/gi, ':').replace(/\s*(às|as|a|-|–|—)\s*/gi, ' - ').trim();
    var horas = texto.match(/\d{1,2}:\d{2}/g);
    if (!horas) return String(valor || '').trim();
    var pad = function (x) { return x.length === 4 ? '0' + x : x; };
    return horas.length >= 2 ? pad(horas[0]) + ' - ' + pad(horas[1]) : pad(horas[0]);
  }

  /* Converte as linhas da planilha em aulas.
     Devolve { aulas, erros } — erros não impedem a importação, são só avisos. */
  function converterLinhas(linhas) {
    var aulas = [];
    var erros = [];

    linhas.forEach(function (linha, indice) {
      var valores = {};
      Object.keys(linha).forEach(function (chave) { valores[semAcento(chave)] = linha[chave]; });

      var bruto = valores['modalidade'];
      var dia = valores['dia'];
      var horario = valores['horario'];
      if (!bruto && !dia && !horario) return; // linha vazia

      var numeroLinha = indice + 2; // +1 do cabeçalho, +1 porque o Excel começa em 1
      var id = idDaModalidade(bruto);
      var diaNome = nomeDoDia(dia);

      if (!id) { erros.push('Linha ' + numeroLinha + ': modalidade "' + (bruto || '') + '" não reconhecida.'); return; }
      if (!diaNome) { erros.push('Linha ' + numeroLinha + ': dia "' + (dia || '') + '" não reconhecido.'); return; }
      if (!horario) { erros.push('Linha ' + numeroLinha + ': horário em branco.'); return; }

      aulas.push({
        modalidade: id,
        dia: diaNome,
        horario: normalizarHorario(horario),
        turma: String(valores['turma'] || '').trim(),
        espaco: String(valores['espaco'] || '').trim(),
      });
    });

    return { aulas: aulas, erros: erros };
  }

  // Modalidades que ficariam sem nenhuma aula depois da importação
  function modalidadesSemAula(aulas) {
    return MODALIDADES.filter(function (m) {
      return !aulas.some(function (a) { return a.modalidade === m.id; });
    }).map(function (m) { return m.label; });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { converterLinhas: converterLinhas, idDaModalidade: idDaModalidade, nomeDoDia: nomeDoDia, normalizarHorario: normalizarHorario, modalidadesSemAula: modalidadesSemAula };
    return;
  }

  // ---------- componente ----------

  var Control = createClass({
    getInitialState: function () {
      return { mensagem: null, erros: [], aviso: null };
    },

    aulas: function () {
      var valor = this.props.value;
      if (!valor) return [];
      return typeof valor.toJS === 'function' ? valor.toJS() : valor;
    },

    salvar: function (aulas) {
      this.props.onChange(aulas);
    },

    importar: function (evento) {
      var self = this;
      var arquivo = evento.target.files && evento.target.files[0];
      evento.target.value = '';
      if (!arquivo) return;

      var leitor = new FileReader();
      leitor.onload = function (e) {
        try {
          var planilha = XLSX.read(e.target.result, { type: 'array' });
          var aba = planilha.Sheets[planilha.SheetNames[0]];
          var linhas = XLSX.utils.sheet_to_json(aba, { defval: '' });
          var resultado = converterLinhas(linhas);

          if (!resultado.aulas.length) {
            self.setState({ mensagem: null, aviso: null, erros: ['Nenhuma aula válida encontrada na planilha.'].concat(resultado.erros) });
            return;
          }

          var faltando = modalidadesSemAula(resultado.aulas);
          self.salvar(resultado.aulas);
          self.setState({
            mensagem: resultado.aulas.length + ' aulas importadas de "' + arquivo.name + '". Clique em Publish para salvar.',
            erros: resultado.erros,
            aviso: faltando.length ? 'Sem nenhuma aula na planilha: ' + faltando.join(', ') + '.' : null,
          });
        } catch (erro) {
          self.setState({ mensagem: null, aviso: null, erros: ['Não consegui ler o arquivo: ' + erro.message] });
        }
      };
      leitor.readAsArrayBuffer(arquivo);
    },

    baixarModelo: function () {
      var aulas = this.aulas();
      var linhas = (aulas.length ? aulas : [{ modalidade: 'boxe', dia: 'Segunda-feira', horario: '08:00 - 09:00', turma: 'Masculino', espaco: '1' }])
        .map(function (a) {
          var m = MODALIDADES.find(function (x) { return x.id === a.modalidade; });
          return { Modalidade: m ? m.label : a.modalidade, Dia: a.dia, 'Horário': a.horario, Turma: a.turma, 'Espaço': a.espaco };
        });

      var aba = XLSX.utils.json_to_sheet(linhas, { header: COLUNAS });
      aba['!cols'] = [{ wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 14 }, { wch: 10 }];
      var planilha = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(planilha, aba, 'Horários');
      XLSX.writeFile(planilha, 'horarios-urban-fight.xlsx');
    },

    alterar: function (indice, campo, valor) {
      var aulas = this.aulas().slice();
      aulas[indice] = Object.assign({}, aulas[indice], {});
      aulas[indice][campo] = valor;
      this.salvar(aulas);
    },

    adicionar: function () {
      this.salvar(this.aulas().concat([{ modalidade: 'boxe', dia: 'Segunda-feira', horario: '', turma: '', espaco: '' }]));
    },

    remover: function (indice) {
      var aulas = this.aulas().slice();
      aulas.splice(indice, 1);
      this.salvar(aulas);
    },

    render: function () {
      var self = this;
      var aulas = this.aulas();

      var botoes = h('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' } }, [
        h('label', {
          key: 'imp',
          style: { background: '#e5171f', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
        }, [
          'Importar planilha (.xlsx ou .csv)',
          h('input', {
            key: 'input',
            type: 'file',
            accept: '.xlsx,.xls,.csv',
            style: { display: 'none' },
            onChange: this.importar,
          }),
        ]),
        h('button', {
          key: 'mod', type: 'button', onClick: this.baixarModelo,
          style: { padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' },
        }, 'Baixar modelo com os horários atuais'),
      ]);

      var avisos = [];
      if (this.state.mensagem) avisos.push(h('p', { key: 'm', style: { color: '#1a7f37', margin: '6px 0' } }, this.state.mensagem));
      if (this.state.aviso) avisos.push(h('p', { key: 'a', style: { color: '#9a6700', margin: '6px 0' } }, this.state.aviso));
      this.state.erros.forEach(function (erro, i) {
        avisos.push(h('p', { key: 'e' + i, style: { color: '#b42318', margin: '4px 0', fontSize: '13px' } }, erro));
      });

      var cabecalho = h('tr', { key: 'head' }, COLUNAS.concat(['']).map(function (c) {
        return h('th', { key: c, style: { textAlign: 'left', fontSize: '12px', padding: '4px' } }, c);
      }));

      var linhas = aulas.map(function (aula, i) {
        var campo = function (nome, largura) {
          return h('input', {
            key: nome, type: 'text', value: aula[nome] || '',
            onChange: function (e) { self.alterar(i, nome, e.target.value); },
            style: { width: largura, padding: '4px' },
          });
        };

        return h('tr', { key: i }, [
          h('td', { key: 'm', style: { padding: '2px 4px' } },
            h('select', {
              value: aula.modalidade,
              onChange: function (e) { self.alterar(i, 'modalidade', e.target.value); },
              style: { padding: '4px' },
            }, MODALIDADES.map(function (m) { return h('option', { key: m.id, value: m.id }, m.label); }))),
          h('td', { key: 'd', style: { padding: '2px 4px' } },
            h('select', {
              value: aula.dia,
              onChange: function (e) { self.alterar(i, 'dia', e.target.value); },
              style: { padding: '4px' },
            }, DIAS.map(function (d) { return h('option', { key: d, value: d }, d); }))),
          h('td', { key: 'h', style: { padding: '2px 4px' } }, campo('horario', '110px')),
          h('td', { key: 't', style: { padding: '2px 4px' } }, campo('turma', '100px')),
          h('td', { key: 'e', style: { padding: '2px 4px' } }, campo('espaco', '60px')),
          h('td', { key: 'x', style: { padding: '2px 4px' } },
            h('button', {
              type: 'button',
              onClick: function () { self.remover(i); },
              style: { border: 0, background: 'none', color: '#b42318', cursor: 'pointer' },
            }, 'remover')),
        ]);
      });

      return h('div', { className: this.props.classNameWrapper, style: { padding: '12px' } }, [
        botoes,
        avisos.length ? h('div', { key: 'avisos' }, avisos) : null,
        h('p', { key: 'total', style: { fontSize: '13px', color: '#555', margin: '8px 0' } },
          aulas.length + ' aulas cadastradas'),
        h('table', { key: 'tabela', style: { borderCollapse: 'collapse', width: '100%' } }, [
          h('thead', { key: 'th' }, cabecalho),
          h('tbody', { key: 'tb' }, linhas),
        ]),
        h('button', {
          key: 'add', type: 'button', onClick: this.adicionar,
          style: { marginTop: '10px', padding: '6px 14px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' },
        }, '+ Adicionar aula'),
      ]);
    },
  });

  var Preview = createClass({
    render: function () {
      var valor = this.props.value;
      var aulas = valor && typeof valor.toJS === 'function' ? valor.toJS() : valor || [];
      return h('p', {}, aulas.length + ' aulas cadastradas');
    },
  });

  window.CMS.registerWidget('horarios-aulas', Control, Preview);
})();
