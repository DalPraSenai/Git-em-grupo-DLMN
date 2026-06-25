import { getItens } from "./storage.js";

let categoriaAtiva = "todos"; 

export function renderizar() {
    const lista = document.querySelector('#lista-de-itens');
    const contador = document.querySelector('#contador-itens');
    const template = document.querySelector('#template-card'); 
    
    const todosItens = getItens();

    const itensAtuais = categoriaAtiva === "todos"
        ? todosItens
        : todosItens.filter(item => item.categoria === categoriaAtiva);
    
    if (contador) contador.textContent = itensAtuais.length;
    
    if (lista && template) {
        lista.innerHTML = '';
        
        itensAtuais.forEach(item => {
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.item-nome').textContent = item.nome;
            clone.querySelector('.item-imagem').src = item.imagem;
            clone.querySelector('.item-imagem').alt = item.nome;
            clone.querySelector('.item-categoria').textContent = item.categoria;
            clone.querySelector('.item-descricao').textContent = item.descricao;
            
            const badge = clone.querySelector('.item-raridade');
            badge.textContent = item.raridade;
            
            badge.classList.remove('bg-danger', 'bg-primary', 'bg-warning', 'bg-success', 'text-dark');
            
            if (item.raridade === "Raro") badge.classList.add('bg-primary');
            if (item.raridade === "Épico") badge.classList.add('bg-warning', 'text-dark');
            if (item.raridade === "Lendário") badge.classList.add('bg-danger');
            if (item.raridade === "Comum") badge.classList.add('bg-success');

            lista.appendChild(clone);
        });
        console.log("DOM atualizado com os cards!");
    } else {
        console.error("Erro: lista ou template não foram encontrados no DOM.");
    }
}

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
}