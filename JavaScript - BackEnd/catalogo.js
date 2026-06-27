import { getItens, deletarItem } from "./storage.js";

let categoriaAtiva = "todos";
let termoBusca = "";
let itemParaExcluir = null;
let excluir;

// Inicializa o modal de exclusão
export function inicializarModal() {
    excluir = new bootstrap.Modal(document.querySelector('#modalExclusao'));

    document.querySelector('#btn-confirmar-exclusao').addEventListener('click', () => {
        // Espera a pessoa confirmar
        const card = document.querySelector(`[data-id="${itemParaExcluir}"]`);
        if (card) {
            card.classList.add('saindo');
            card.addEventListener('animationend', () => {
                deletarItem(itemParaExcluir);
                itemParaExcluir = null;
                excluir.hide();
                inicializarFiltros();
                renderizar();
            });
        }
    });
}

// Renderiza os cards de itens na página
export function renderizar() {
    const lista = document.querySelector('#lista-de-itens');
    const contador = document.querySelector('#contador-itens');
    const template = document.querySelector('#template-card');

    const todosItens = getItens();

    // Filtra por categoria e busca
    const itensAtuais = todosItens.filter(item => {
        const categoriaOk = categoriaAtiva === "todos" || item.categoria === categoriaAtiva;
        const buscaOk = item.nome.toLowerCase().includes(termoBusca.toLowerCase());
        return categoriaOk && buscaOk;
    });

    if (contador) contador.textContent = itensAtuais.length;

    lista.innerHTML = '';

    itensAtuais.forEach(item => {
        const clone = template.content.cloneNode(true);

        // Adiciona data-id na coluna pra animação de saída funcionar
        const coluna = clone.querySelector('.col-md-4');
        coluna.dataset.id = item.id;

        clone.querySelector('.item-nome').textContent = item.nome;
        clone.querySelector('.item-imagem').src = item.imagem;
        clone.querySelector('.item-imagem').alt = item.nome;
        clone.querySelector('.item-categoria').textContent = item.categoria;
        clone.querySelector('.item-descricao').textContent = item.descricao;

        // Define a cor do badge conforme a raridade
        const badge = clone.querySelector('.item-raridade');
        badge.textContent = item.raridade;

        if (item.raridade === "Raro") badge.classList.add('bg-primary');
        if (item.raridade === "Épico") badge.classList.add('bg-warning', 'text-dark');
        if (item.raridade === "Lendário") badge.classList.add('bg-danger');
        if (item.raridade === "Comum") badge.classList.add('bg-success');

        // Abre o modal ao clicar em excluir, guardando o id do item
        clone.querySelector('.btn-excluir').addEventListener('click', () => {
            itemParaExcluir = item.id;
            document.querySelector('#modal-nome-item').textContent = item.nome;
            excluir.show();
        });

        lista.appendChild(clone);
    });

    // Exibe mensagem caso nenhum item seja encontrado
    const mensagem = document.querySelector('#mensagem-vazia');
    if (mensagem) mensagem.style.display = itensAtuais.length === 0 ? 'block' : 'none';
}

// Destaca o botão de filtro ativo
function atualizarBotoes(container, btnAtivo) {
    container.querySelectorAll('button').forEach(b => {
        b.style.removeProperty('background-color');
        b.style.removeProperty('color');
        b.style.removeProperty('border-color');
    });
    btnAtivo.style.setProperty('background-color', '#C98A4B', 'important');
    btnAtivo.style.setProperty('color', '#fff', 'important');
    btnAtivo.style.setProperty('border-color', '#C98A4B', 'important');
}

// Cria os botões de filtro por categoria e inicializa a busca
export function inicializarFiltros() {
    const categorias = ["todos", ...new Set(getItens().map(i => i.categoria))];
    const container = document.querySelector('#filtros-categoria');
    if (!container) return;

    container.innerHTML = '';

    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat === "todos" ? "Todos" : cat;
        btn.className = 'btn btn-sm me-2 mb-2 btn-outline-secondary';

        btn.addEventListener('click', () => {
            categoriaAtiva = cat;
            atualizarBotoes(container, btn);
            renderizar();
        });

        if (cat === "todos") {
            btn.style.setProperty('background-color', '#C98A4B', 'important');
            btn.style.setProperty('color', '#fff', 'important');
            btn.style.setProperty('border-color', '#C98A4B', 'important');
        }

        container.appendChild(btn);
    });

    // Atualiza a busca a cada tecla digitada
    const inputBusca = document.querySelector('#busca');
    if (inputBusca) {
        inputBusca.addEventListener('input', e => {
            termoBusca = e.target.value;
            renderizar();
        });
    }
}