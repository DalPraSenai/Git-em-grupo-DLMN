function Cadastrar() {
  const nomeEl = document.querySelector("#nomeDeUsuario");
  const emailEl = document.querySelector("#email");
  const senhaEl = document.querySelector("#senha");
  const confirmarEl = document.querySelector("#confirmeSenha");

  // Limpa validações anteriores
  [nomeEl, emailEl, senhaEl, confirmarEl].forEach(el => {
    el.classList.remove("is-valid", "is-invalid");
  });

  let valido = true;

  if (nomeEl.value.trim() === "") {
    nomeEl.classList.add("is-invalid");
    valido = false;
  } else {
    nomeEl.classList.add("is-valid");
  }

  if (emailEl.value.trim() === "") {
    emailEl.classList.add("is-invalid");
    valido = false;
  } else {
    emailEl.classList.add("is-valid");
  }

  if (senhaEl.value.trim() === "") {
    senhaEl.classList.add("is-invalid");
    valido = false;
  } else {
    senhaEl.classList.add("is-valid");
  }

  if (confirmarEl.value.trim() === "" || confirmarEl.value !== senhaEl.value) {
    confirmarEl.classList.add("is-invalid");
    document.querySelector("#erroConfirmarSenha").textContent =
      confirmarEl.value === "" ? "Confirme a senha." : "As senhas não coincidem.";
    valido = false;
  } else {
    confirmarEl.classList.add("is-valid");
  }

  if (!valido) return;

  const usuario = {
    nomeDeUsuario: nomeEl.value.trim(),
    email: emailEl.value.trim(),
    senha: senhaEl.value
  };

  console.log("Usuário cadastrado:", usuario);

  // Limpa os campos
  [nomeEl, emailEl, senhaEl, confirmarEl].forEach(el => {
    el.value = "";
    el.classList.remove("is-valid", "is-invalid");
  });

    document.querySelector("#mensagem-sucesso").style.display = "block";}