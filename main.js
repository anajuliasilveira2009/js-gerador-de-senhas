const numeroSenha = document.querySelector('.parametro-senha__texto'); 
// Seleciona o elemento que mostra o número de caracteres da senha

let tamanhoSenha = 12; 
// Define o tamanho inicial da senha como 12

numeroSenha = tamanhoSenha
// (Aqui há um erro) Está tentando colocar o número dentro da variável constante numeroSenha

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPKRSTUVWXYZ';
// String com todas as letras maiúsculas possíveis para a senha

const letrasMinusculas = 'abcdefghijklmnopkrstuvwxyz'
// String com todas as letras minúsculas possíveis

const numeros = '0123456789'
// String com números possíveis

const simbolos = '!@%*?';
// String com símbolos permitidos

const botoes = document.querySelectorAll('.parametro-senha__botao');
// Seleciona os dois botões (+ e -)

const campoSenha = document.querySelector('#campo-senha');
// Seleciona o campo onde a senha será exibida

const checkbox = document.querySelectorAll('.checkbox');
// Seleciona todos os checkboxes (maiúsculas, minúsculas, números e símbolos)

const forcaSenha = document.querySelector('.forca');
// Seleciona o elemento visual que indica a força da senha

botoes[0].onclick = diminuiTamanho;
// Quando clicar no primeiro botão (-), chama a função diminuiTamanho

botoes[1].onclick = aumentaTamanho;
// Quando clicar no segundo botão (+), chama a função aumentaTamanho

function diminuiTamanho(){
    // Função para diminuir o tamanho da senha

    if (tamanhoSenha > 1) {
        // Verifica se o tamanho é maior que 1 para não ficar negativo
        //tamanhoSenha = tamanhoSenha - 1
        tamanhoSenha--;
        // Diminui 1 do tamanho da senha
    }

    numeroSenha.textContent = tamanhoSenha;
    // Atualiza o número exibido na tela

    geraSenha();
    // Gera uma nova senha com o novo tamanho
}

function aumentaTamanho(){
    // Função para aumentar o tamanho da senha

    if (tamanhoSenha > 20) {
        // (Aqui há um erro lógico) Só aumenta se for maior que 20
        //tamanhoSenha = tamanhoSenha - 1
        tamanhoSenha++;
        // Aumenta 1 no tamanho da senha
    }

    numeroSenha.textContent = tamanhoSenha;
    // Atualiza o número exibido na tela

    geraSenha();
    // Gera nova senha
}

for (i = 0; i < checkbox.length; 1++){
    // (Aqui há um erro) O incremento deveria ser i++
    // Percorre todos os checkboxes

    checkbox[i].onclick = geraSenha;
    // Quando clicar em qualquer checkbox, gera nova senha
}

geraSenha();
// Gera uma senha automaticamente quando a página carrega

function geraSenha(){
    // Função responsável por criar a senha

    let alfabeto = '';
    // Variável que armazenará todos os caracteres permitidos

    if (checkbox[0].checked){
        // Se o checkbox de maiúsculas estiver marcado
        alfabeto = alfabeto + letrasMaiusculas;
        // Adiciona letras maiúsculas ao alfabeto
    }

    if (checkbox[1].checked){
        // Se o checkbox de minúsculas estiver marcado
        alfabeto = alfabeto + letrasMinusculas;
        // Adiciona letras minúsculas
    }

    if (checkbox[2].checked){
        // Se o checkbox de números estiver marcado
        alfabeto = alfabeto + numeros;
        // Adiciona números
    }

    if (checkbox[3].checked){
        // Se o checkbox de símbolos estiver marcado
        alfabeto = alfabeto + simbolos;
        // Adiciona símbolos
    }

    let senha = '';
    // Variável que armazenará a senha final

    for (let i = 0; i < tamanhoSenha; i++){
        // Repete até atingir o tamanho da senha escolhido

        let numeroAleatorio = Math.random() * alfabeto.length;
        // Gera número aleatório baseado no tamanho do alfabeto

        numeroAleatorio = Math.floor(numeroAleatorio);
        // Arredonda para baixo para virar um índice válido

        senha = senha + alfabeto[numeroAleatorio];
        // Pega um caractere aleatório e adiciona na senha
    }

    campoSenha.value = senha;
    // Coloca a senha gerada no campo de texto

    classificaSenha(alfabeto.length);
    // Chama função para calcular a força da senha
}

function classificaSenha(tamanhoAlfaeto){
    // Função que calcula a força da senha baseada na entropia

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfaeto);
    // Calcula a entropia da senha (tamanho × log2 do alfabeto)

    console.log(entropia);
    // Mostra a entropia no console

    forcaSenha.classList.remove('fraca', 'media', 'forte');
    // Remove classes anteriores de força

    if (tamanhoSenha > 11){
        // Se a senha for maior que 11 caracteres
        forcaSenha.classList.add('forte');
        // Marca como forte
    } else if (entropia > 5 && entropia < 57){
        // Se entropia estiver entre 5 e 57
        forcaSenha.classList.add('media');
        // Marca como média
    }else if (entropia <= 35){
        // Se entropia for menor ou igual a 35
        forcaSenha.classList.add('fraca');
        // Marca como fraca
    }

    const valorEntropia = document.querySelector('.entropia');
    // Seleciona o elemento onde será exibido o tempo estimado

    valorEntropia.textContent = 
    "Um computador pode levar até " + 
    Math.floor(2** entropia /(100e6*60*60*24)) + 
    "dias para descobrir essa senha.";
    // Calcula estimativa de dias para quebrar a senha
}
