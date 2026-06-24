function Cadastrar() {
const nomeDeUsuario = document.querySelector("#nomeDeUsuario").value;
const email = document.querySelector("#email").value;
const senha = document.querySelector("#senha").value;
const confirmarSenha = document.querySelector("#confirmeSenha").value;

if (nomeDeUsuario === "" || email === "" || senha === "" || confirmarSenha === ""){
    console.log("Preencha todos os campos!");
    return;
}
if (senha !== confirmarSenha){
    console.log("As senhas não coincidem!");
    return;
};
const usuariocadastrado = {
    nomeDeUsuario,
    email,
    senha,
    confirmarSenha
};

console.log("Usuário Cadastrado com sucesso.");
console.log(usuariocadastrado);

document.querySelector("#nomeDeUsuario").value = "";
document.querySelector("#email").value = "";
document.querySelector("#senha").value = "";
document.querySelector("#confirmeSenha").value = "";
}