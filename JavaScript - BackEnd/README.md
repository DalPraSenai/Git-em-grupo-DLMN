-Troubleshooting: imagens/itens não atualizam:
Se você editou os itens em "app.js" (nome, descrição, caminho de imagem, etc.) e a mudança não aparece no site, não é bug — é o "localStorage" guardando os dados antigos.

- Por que acontece:
O "storage.js" só salva os itens iniciais uma vez, na primeira abertura do site:

```js
export function inicializarItens(itensIniciais) {
    if (carregar('itens').length === 0) {
        salvar('itens', itensIniciais);
    }
}
```

Depois disso o "localStorage" já tem dados, então nunca mais sobrescreve — mesmo que você mude o `app.js`.

-Como resolver:

1. Abra o site no navegador
2. Aperte F12 e vá no Console
3. Execute:
```js
localStorage.removeItem('tartarius_itens')
```
4. Confirme que limpou:
```js
localStorage.getItem('tartarius_itens') // deve retornar null
```
5. Recarregue a página com F5

-Dica: 
Se isso incomodar durante o desenvolvimento, é possível ajustar o "storage.js" pra sempre usar os dados mais recentes do "app.js" é só pedir.