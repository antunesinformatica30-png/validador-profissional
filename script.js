console.log("JS carregado");

// ===== ELEMENTOS ===== //
const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmarSenha");

const emailResult = document.getElementById("emailResult");
const senhaResult = document.getElementById("senhaResult");
const confirmarResult = document.getElementById("confirmarResult");

const mensagemFinal = document.getElementById("mensagemFinal");
const toggleSenha = document.getElementById("toggleSenha");

// ===== EMAIL ===== //
function validarEmail(email) {
    if (!email.includes("@") || !email.includes(".")) {
        return { mensagem: "Email inválido", classe: "error", valido: false };
    }

    const usuario = email.split("@")[0];

    if (/\d{3,}/.test(usuario)) {
        return { mensagem: "Evite muitos números", classe: "warn", valido: false };
    }

    return { mensagem: "Email OK", classe: "ok", valido: true };
}

// ===== SENHA ===== //
function validarSenha(senha) {
    if (senha.length < 8) {
        return { mensagem: "Mínimo 8 caracteres", classe: "error", valido: false };
    }

    if (!/[A-Z]/.test(senha)) {
        return { mensagem: "Use letra maiúscula", classe: "warn", valido: false };
    }

    if (!/[0-9]/.test(senha)) {
        return { mensagem: "Use números", classe: "warn", valido: false };
    }

    return { mensagem: "Senha forte", classe: "ok", valido: true };
}

// ===== CONFIRMAR ===== //
function validarConfirmacao(senha, confirmar) {
    if (senha !== confirmar) {
        return { mensagem: "Senhas diferentes", classe: "error", valido: false };
    }

    return { mensagem: "Senhas conferem", classe: "ok", valido: true };
}

// ===== SUBMIT ===== //
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmar = confirmarInput.value;

    const resEmail = validarEmail(email);
    const resSenha = validarSenha(senha);
    const resConfirmar = validarConfirmacao(senha, confirmar);

    emailResult.textContent = resEmail.mensagem;
    senhaResult.textContent = resSenha.mensagem;
    confirmarResult.textContent = resConfirmar.mensagem;

    if (resEmail.valido && resSenha.valido && resConfirmar.valido) {
        mensagemFinal.textContent = "Cadastro realizado com sucesso!";
    } else {
        mensagemFinal.textContent = "Corrija os erros!";
    }
});

// ===== OLHO SENHA ===== //
toggleSenha.addEventListener("click", function() {
    if (senhaInput.type === "password") {
        senhaInput.type = "text";
    } else {
        senhaInput.type = "password";
    }
});