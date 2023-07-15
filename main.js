const form = document.getElementById('form-atividade'); 
const imgAprovado = '<img src="./imagens/aprovado.png" alt="emoji festejando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="emoji decepcionado" />';
const atividades = []; //array para adicionar todos os dados inseridos pelo usuário//
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:")); //pop-up solicitando nota minima//

let linhas = ''; 

form.addEventListener('submit', function(e) {
    e.preventDefault();  //evento para remover atualiação de página//

    adicionaLinha(); //funções criadas para não ficar muita informação acumulada//
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { //função para evitar nomes duplicados//
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value); //push criado para cada vez que a linha for chamada adicionará o conteúdo//
        notas.push(parseFloat(inputNotaAtividade.value)); //converter a string em número (parseFloat)//

        let linha = '<tr>'; //recebe como string na linha//
        linha += `<td>${inputNomeAtividade.value}</td>`; //concatenação (+=) dentro da coluna//
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // if (?) e else (:)//
        linha += '</tr>';

        linhas += linha; //ação para as informações se manter na tabela//
    }

    inputNomeAtividade.value = ''; //limpar o campo após inserir as informações//
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas; //inserir conteúdo dentro do corpo da tabela//
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //ação para quatidade de algorismos significativos//
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0; 

    for (let i = 0; i < notas.length; i++) { 
        //começa como zero enquanto o (i) for menor que as notas inseridas e (i++) informa que registrou//
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length //soma das notas dividido pela quantidade de notas inseridas//
}