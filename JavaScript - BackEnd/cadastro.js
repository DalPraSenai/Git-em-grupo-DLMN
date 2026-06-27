function cadastrarItem() {
    const nomeEl = document.querySelector('#nomeItem');
    const categoriaEl = document.querySelector('#categoriaItem');
    const raridadeEl = document.querySelector('#raridadeItem');
    const descricaoEl = document.querySelector('#descricaoItem');

    // Limpa validações anteriores
    [nomeEl, categoriaEl, raridadeEl, descricaoEl].forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });

    let valido = true;

    if (nomeEl.value.trim() === '') {
        nomeEl.classList.add('is-invalid');
        valido = false;
    } else {
        nomeEl.classList.add('is-valid');
    }

    if (categoriaEl.value === '') {
        categoriaEl.classList.add('is-invalid');
        valido = false;
    } else {
        categoriaEl.classList.add('is-valid');
    }

    if (raridadeEl.value === '') {
        raridadeEl.classList.add('is-invalid');
        valido = false;
    } else {
        raridadeEl.classList.add('is-valid');
    }

    if (descricaoEl.value.trim() === '') {
        descricaoEl.classList.add('is-invalid');
        valido = false;
    } else {
        descricaoEl.classList.add('is-valid');
    }

    if (!valido) return;

    // Cria o novo item
    const novoItem = {
        id: Date.now(),
        nome: nomeEl.value.trim(),
        categoria: categoriaEl.value,
        raridade: raridadeEl.value,
        descricao: descricaoEl.value.trim(),
        imagem: '../Imagens/default.png'
    };

    // Salva no localStorage
    const itensAtuais = JSON.parse(localStorage.getItem('tartarius_itens') || '[]');
    itensAtuais.push(novoItem);
    localStorage.setItem('tartarius_itens', JSON.stringify(itensAtuais));

    // Limpa os campos e redireciona
    [nomeEl, categoriaEl, raridadeEl, descricaoEl].forEach(el => {
        el.value = '';
        el.classList.remove('is-valid', 'is-invalid');
    });

    setTimeout(() => {
        window.location.href = 'catalogo.html';
    }, 1500);
}