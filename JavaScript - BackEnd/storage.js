const PREFIXO = 'tartarius_';

// ============================== Funções básicas =============================

function salvar(chave, valor) {
    try {
        localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    } catch (erro) {
        console.error("Erro ao salvar no localStorage: ", erro);
    }
}

function carregar(chave) {
    try {
        const dados = localStorage.getItem(PREFIXO + chave);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        console.error("Erro ao carregar do localStorage:", erro);
        return [];
    }
}

// ============================ Para Itens Mágicos =============================

export function inicializarItens(itensIniciais) {
    if (carregar('itens').length === 0) {
        salvar('itens', itensIniciais);
        console.log('Itens iniciais salvos no localStorage');
    }
}

export function getItens() {
    return carregar('itens');
}

export function salvarItens(itens) {
    salvar('itens', itens);
}

export function limparItens() {
    localStorage.removeItem(PREFIXO + 'itens');
}

export function deletarItem(id) {
    salvarItens(getItens().filter(item => item.id !== id));
}