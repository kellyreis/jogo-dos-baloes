var timerID = null; //Variavel que armazena a chamada da função TimeOut



function iniciaJogo() {
    var url = window.location.search;


    var nivel_jogo = url.replace("?", "");

    var tempos_segundos = 0;

    if (nivel_jogo == 1) {
        //Fácil 1 > 120 segundos
        tempos_segundos = 120;

    }
    if (nivel_jogo == 2) {
        //Normal 2 > 60segundos
        tempos_segundos = 60;
    }
    if (nivel_jogo == 3) {
        //difil 3 > //30segundos

        tempos_segundos = 30;
    }

    //Inserir o segundos no span
    document.getElementById('cronometro').innerHTML = tempos_segundos;

    //Quantidade de baloes
    var qtd_baloes = 40;

    cria_baloes(qtd_baloes);


    //Mostra qtd de baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempos_segundos + 1);

}

function contagem_tempo(segundos) {

    segundos = segundos - 1;

    if (segundos == -1) {
        clearTimeout(timerID); //Para a execução da função

        gameOver();

        return false;


    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerID = setTimeout("contagem_tempo(" + segundos + ")", 1000);

}

function cria_baloes(qtd_baloes) {
    for (var i = 1; i <= qtd_baloes; i++) {

        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function() {
            estourar(this);
        }
        document.getElementById('cenario').appendChild(balao);

    }
}

function gameOver() {
    remove_eventos_baloes();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}

function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';


    pontuacao(-1);

}


function pontuacao(acao) {

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;


    situacao_jogo(baloes_inteiros);

}


function situacao_jogo(baloes_inteiros) {

    if (baloes_inteiros == 0) {
        alert('Parabéns, você conseguiu estourar todos os balões a tempo!')
        pararjogo();
    }

}

function pararjogo() {
    clearTimeout(timerID);
}


function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}