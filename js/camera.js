const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener('click', async function () {//utilizado async pois precisa esperar o usuário aceitar
    const iniciarVideo = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });// Nesta linha, estamos utilizando a API navigator.mediaDevices.getUserMedia() para solicitar acesso à câmera do usuário e inicializar o vídeo. A função retorna uma Promise que é resolvida quando o usuário permite o acesso à câmera. O resultado é armazenado na variável iniciarVideo.

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo;//Ao atribuir esse objeto à propriedade srcObject, estamos definindo o vídeo da câmera do usuário como a origem do elemento <video>. Isso faz com que o vídeo da câmera seja exibido no elemento <video>. Dessa forma, quando o botão for clicado e a função for executada, o vídeo da câmera será iniciado e exibido no elemento <video> da página. 
});

botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);// .drawImage(video, 0, 0, canvas.width, canvas.height): Com o contexto 2D do canvas, estamos usando o método drawImage para desenhar a imagem do vídeo no canvas. O parâmetro video representa o elemento de vídeo que contém a imagem que queremos desenhar. 
    
    // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);// .drawImage(video, 0, 0, canvas.width, canvas.height): Com o contexto 2D do canvas, estamos usando o método drawImage para desenhar a imagem do vídeo no canvas. O parâmetro video representa o elemento de vídeo que contém a imagem que queremos desenhar.Em resumo, essa linha de código está desenhando a imagem do vídeo no canvas, posicionando-a no canto superior esquerdo do canvas e definindo seu tamanho para ser igual ao tamanho do canvas. 

    

    imagemURL = canvas.toDataURL('image/jpeg');//Aqui, estamos usando o método toDataURL do canvas para converter a imagem desenhada no canvas em uma URL. Essa URL é então armazenada na variável imagemURL no formato jpeg

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");//pegando o objeto com a chave cadastro salvo no localstorage
    const converteRetorno = JSON.parse(receberDadosExistentes);//Aqui estamos convertendo os dados obtidos em formato JSON para um objeto JavaScript. Isso nos permite manipular esses dados de forma mais fácil.

    converteRetorno.imagem = imagemURL;//Nesta linha, estamos adicionando a URL da foto tirada à propriedade "imagem" do objeto converteRetorno. Ou seja, estamos atualizando os dados com a URL da foto.

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))//Aqui estamos atualizando os dados no localStorage. Estamos inserindo novamente os dados atualizados com a chave "cadastro". Para isso, estamos convertendo o objeto converteRetorno em uma string JSON.

    window.location.href = '../pages/abrir-conta-form-3.html';
})