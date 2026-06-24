## 🐛 Troubleshooting: imagens/itens não atualizam

Se você editou os itens em `app.js` (nome, descrição, **caminho de imagem**, etc.) e a mudança não aparece no site, **não é bug** — é o `localStorage` do navegador guardando os dados antigos em cache.

### Por que isso acontece

O `storage.js` só salva os itens iniciais **uma vez**, na primeira vez que o site é aberto:

```js
export function inicializarItens(itensIniciais) {
    if (carregar('itens').length === 0){
        salvar('itens', itensIniciais);
    }
}
```

Depois disso, o `localStorage` já tem dados salvos, então essa função nunca mais sobrescreve — mesmo que você mude o `app.js`. Por isso suas edições "não funcionam".

### Como resolver (toda vez que editar os itens em `app.js`)

1. Abra o site no navegador.
2. Aperte **F12** para abrir o DevTools.
3. Vá na aba **Console**.
4. Cole e execute:
   ```js
   localStorage.removeItem('tartarius_itens')
   ```
5. Confirme que limpou (deve retornar `null`):
   ```js
   localStorage.getItem('tartarius_itens')
   ```
6. Recarregue a página (**F5**).

Agora os itens novos do `app.js` serão salvos do zero e suas alterações vão aparecer.

### Dica extra
Se isso te incomodar durante o desenvolvimento, dá pra ajustar o `storage.js` pra sempre usar os dados mais recentes do `app.js` em vez de depender do cache — me avisem se quiserem essa mudança.