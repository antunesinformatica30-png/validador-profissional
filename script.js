console.log("JS Carregado");

//==== ELEMENTOS ====

const form = document.getElementById("form");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");

const emailResultEl = document.getElementById("emailResult");
const senhaResultEl = document.getElementById("senhaResult");

const mensagemFinal = document.getElementById("mensagemFinal");
const strengthFill = document.getElementById("strengthFill");

const toggleSenha = document.getElementById("toggleSenha");

//==== EMAIL ====
function validarEmail(email) {
    email = String(email).trim();

    if(!email.includes("@")) {
        return {mensagem:"Digite um email válido", classe:"error", valido: false};
    }

    const partes = email.split("@");

    if(partes.length !== 2) {
        return {mensagem:"Formato do email inválido", classe:"error", valido:false};
    }

    const usuario = partes [0].toLowerCase();
    const dominio = partes[1];

    if (!dominio.includes(".")) {
        return {mensagem: "Domínio inválido", classe: "error", valido: false};
    }

    const palavrasProibidas = [
        "princesa", "princesinha", "ninfeta", "gata", "gatinha", "fofa", "baby", "123", "2020"
    ];

    const nomeValido = /^[a-z]+(\.[a-z]+)+$/.test(usuario);
    const temPalavraRuim = palavrasProibidas.some(p => usuario.includes(p));

    if (nomeValido || temPalavraRuim) {
        return {mensagem: "Use nome e sobrenome (ex:joao.silva)", classe: "warn", valido: false};
    }
    return {mensagem: "Email profissional", classe: "ok", valido: true};
}

//==== SENHA ====
function validarSenha(senha) {
    let pontos = 0;

    if(senha.length >= 8) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) {
        return {mensagem: "Senha fraca", classe: "error", valido: false};
    } else if (pontos <= 4) {return {mensagem: "Senha média", classe: "warn", valido: false};}
    return {mensagem: "Senha forte", classe: "ok", valido: true};
}

//==== BARRA SENHA ====
function atualizarBarraSenha(senha) {
    if (!strengthFill) return;

    let pontos = 0;

    if(senha.length >= 8) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;
    
    strengthFill.className = "";

    if (pontos <= 2) {
        strengthFill.classList.add("fraca");
    } else if (pontos <=4) { strengthFill.classList.add("média");}
    else {strengthFill.classList.add("forte");}
}

//==== EVENTO INPUT ====
senhaInput.addEventListener("input", () => {atualizarBarraSenha(senhaInput.value);});

//==== TOGGLE SENHA ====
toggleSenha.addEventListener("click", () => {
    const tipo = senhaInput.type === "password" ? "text" : "password";

    senhaInput.type = tipo;
    confirmarSenhaInput.type = tipo;

    toggleSenha.textContent = tipo === "password" ? "👀" : "🙈" ;
});

//==== SUBMIT ====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    const resultadoEmail = validarEmail(email);
    const resultadoSenha =  validarSenha(senha);

    //===EMAIL===
    if (emailResultEl) {
        senhaResultEl.innerText = resultadoEmail.mensagem;
    } emailInput.className = resultadoEmail.classe;

    //===SENHA===
    if (senhaResultEl) {
        senhaResultEl.innerText = resultadoSenha.mensagem;
    } senhaInput.className = resultadoSenha.classe;

    //===CONFIRMAR SENHA===
    let senhaConfere = false;

    if (senha === confirmarSenha && senha.length > 0) {
        senhaConfere = true;
    } else {if (senhaResultEl){senhaResultEl.innerText = 
        "Senhas não coincidem";
    }}

    //===FINAL===
    if (resultadoEmail.valido && resultadoSenha.valido && senhaConfere) {
        mensagemFinal.innerText = "Cadastro realizado com sucesso!";
        mensagemFinal.className = "mensagem sucesso"; 
        //LIMPAR CAMPOS
    emailInput.value = "";
    senhaInput.value = "";
    confirmarSenhaInput.value = "";

    emailInput.className = "";
    senhaInput.className = "";
    strengthFill.className = "";

    emailResultEl.innerText = "";
    senhaResultEl.innerText = "";
    } else { mensagemFinal.innerText = "Corrija os erros antes de continuar";
        mensagemFinal.className = "mensagem erro";
    }  
});
