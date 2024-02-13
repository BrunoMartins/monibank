import verificaCPF from "./valida-cpf.js";
import verificaIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,// O e.target se refere ao elemento HTML que disparou o evento de envio do formulário, ou seja, o próprio formulário. O elements é uma propriedade desse elemento que contém uma coleção de todos os elementos do formulário. Ao acessar elements["nome"], estamos selecionando o elemento com o atributo name igual a "nome"
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-conta-form-2.html";
})

camposDoFormulario.forEach((campo)=> {
    campo.addEventListener("blur",()=>verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());//retirando as mensagens padrões de erro

})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
};

function verificaCampo(campo){
    let mensagem = "";
    campo.setCustomValidity('');

    if(campo.name == "cpf" && campo.value.length >=11){
        verificaCPF(campo);
    }
    if(campo.name =="aniversario" && campo.value !=""){
        verificaIdade(campo);
    }

    tiposDeErro.forEach(erro => {//verificar dentro da lista de erros se algum deles esta como true no (campo). Caso seja true ele ira procurar dentro do objeto o nome do campo e depois a mensagem de erro
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');//seleciona somente o span com mensagem de erro próximo ao input (campo). Para não pegar todos os spans do arquivo
    const validadorDeInput = campo.checkValidity();//Check para verificar se o campo está válido

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }

}

