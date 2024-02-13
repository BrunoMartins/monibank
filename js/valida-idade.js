export default function verificaIdade(campo){
    const dataNascimento = new Date (campo.value);//cria um objeto de data com o valor do campo
    if (!validaIdade(dataNascimento)) {//caso de false (-18)
        campo.setCustomValidity('O usuário não é maior de idade');//para ativar o customValidity ele precisa receber qualquer informação que não seja false. Com isso ele vai receber a mensagem gravada no objeto
    };
}



function validaIdade(data){
    const dataAtual = new Date();//pegando a data atual
    const dataMaiorDe18 = new Date(data.getUTCFullYear() + 18,data.getUTCMonth(),data.getUTCDate());//pegando as informações de ano, mês e dia da data que foi inserida no HTML e colocou  18 anos a mais para verificar quando a pessoa fez 18 anos

    return dataAtual>= dataMaiorDe18;//verifica se a data atual e maior ou igual a data que o usuário fez 18 anos, caso verdadeiro vai dar true
}