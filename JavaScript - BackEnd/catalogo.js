import { getItens } from "./storage.js";

export function renderizar() {
    const lista = document.querySelector('#lista-de-itens');
    const contador = document.querySelector('#contador-itens');
    const template = document.querySelector('#template-card'); 
    
    const itensAtuais = getItens();
    
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
