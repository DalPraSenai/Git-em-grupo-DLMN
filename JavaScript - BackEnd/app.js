import { inicializarItens, getItens, salvarItens } from "./storage.js";

const itens = [
    {
      id: 1,
      nome: "Amuleto do Pacto Silencioso",
      categoria: "Amuleto",
      raridade: "Raro",
      descricao: "Quem o veste não mente — e não pode ser enganado.",
      imagem: "img/amuleto.png"
    },
    {
      id: 2,
      nome: "Adaga do Sacrifício",
      categoria: "Arma",
      raridade: "Épico",
      descricao: "Cada corte que ela faz, alimenta quem a empunha. Tartarius nunca explicou de onde ela vinha — só disse que 'lembrava de casa'.",
      imagem: "https://img.pikbest.com/origin/09/29/02/94mpIkbEsTdDS.png!sw800"
    },
    {
      id: 3,
      nome: "Presa de Lobisomem",
      categoria: "Relíquia",
      raridade: "Comum",
      descricao: "Um souvenir de uma das muitas brigas de Tartarius. Ele dizia que era 'só decoração'.",
      imagem: "https://png.pngtree.com/png-clipart/20230623/original/pngtree-vampire-fangs-png-image_9205259.png"
    },
    {
      id: 4,
      nome: "Frasco de Sangue Antigo",
      categoria: "Poção",
      raridade: "Raro",
      descricao: "Selado há séculos. Ninguém no inventário teve coragem de abrir pra checar o que tem dentro.",
      imagem: "img/frasco.png"
    },
    {
      id: 5,
      nome: "Anel do Último Suspiro",
      categoria: "Anel",
      raridade: "Lendário",
      descricao: "Concede um fôlego extra no momento da morte. Já foi usado uma vez — funcionou.",
      imagem: "img/anel.png"
    },
    {
      id: 6,
      nome: "Grimório de Capa Rasgada",
      categoria: "Livro",
      raridade: "Épico",
      descricao: "Faltam páginas. Tartarius dizia que 'eram as melhores partes'.",
      imagem: "img/grimorio.png"
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
      inicializarItens(itens);
      console.log("Itens carregados do localStorage:", getItens());
  });
  