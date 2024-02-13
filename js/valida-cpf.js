export default function verificaCPF(campo){
    const cpf = campo.value.replace(/\.|-/g, "");//retirando o . e - do cpf para ficar apenas com os números
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {//caso qualquer uma das verificações retorne como true
        campo.setCustomValidity('Esse cpf não é válido');
    } 
}


function validaNumerosRepetidos(cpf){
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
        ];

        return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0;tamanho<9;tamanho ++){//percorre os 9 numeros do cpf e multiplica cada um deles, a multiplicação começa com 10 e vai diminuindo. O cpf inicia na posição [0] e vai aumentando para passar por todos os 9 números.
        soma+=cpf[tamanho] * multiplicador;
        multiplicador--;
    }
    soma= (soma*10)%11;

    if(soma==10 || soma ==11){
        soma=0
    }
    return soma != cpf[9];//caso o número retornado seja diferente do 10º número do cpf vai dar true (significa que o número digitado é diferente do número esperado). Caso estejam iguais vai retornar false
}

function validaSegundoDigito(cpf){
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0;tamanho<10;tamanho ++){
        soma+=cpf[tamanho] * multiplicador;
        multiplicador--;
    }
    soma= (soma*10)%11;

    if(soma==10 || soma ==11){
        soma=0
    }
    return soma != cpf[10];
}

