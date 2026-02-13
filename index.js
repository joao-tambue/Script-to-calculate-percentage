// const readline = require("readline");

// const terminalInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// /**
//  * Faz uma pergunta no terminal
//  * @param {string} pergunta
//  * @returns {Promise<string>}
//  */
// function fazerUmaPergunta(pergunta) {
//   return new Promise((resolve) => {
//     terminalInterface.question(pergunta, resolve);
//   });
// }

// /**
//  * Valida e retorna uma nota entre 0 e 20
//  * @param {string} mensagem
//  * @returns {Promise<number>}
//  */
// async function obterNotaValida(mensagem) {
//   while (true) {
//     const entrada = await fazerUmaPergunta(mensagem);
//     const nota = Number(entrada);

//     if (!isNaN(nota) && nota >= 0 && nota <= 20) {
//       return nota;
//     }

//     console.log("Valor inválido. Digite um número entre 0 e 20.");
//   }
// }

// /**
//  * Calcula percentagem individual
//  */
// function calcularPercentagem(mediaDoAluno, percentualPorIntegrante) {
//   return (mediaDoAluno * percentualPorIntegrante) / 20;
// }

// /**
//  * Renderiza tabela no terminal
//  */
// function imprimirTabela(alunos) {
//   console.log("\n===== RESULTADO FINAL =====\n");

//   console.log("Ordem | Nome               | %Percentagem");
//   console.log("------------------------------------------");

//   alunos.forEach((aluno) => {
//     console.log(
//       `${aluno.ordem.toString().padEnd(5)} | ` +
//       `${aluno.nome.padEnd(18)} | ` +
//       `${aluno.percentagem}%`
//     );
//   });
// }

// async function executar() {
//   console.log("\n===== CÁLCULO DE PERCENTAGEM DO GRUPO =====\n");

//   const numeroDeMembros = Number(
//     await fazerUmaPergunta("Digite o número de integrantes do grupo: ")
//   );

//   if (isNaN(numeroDeMembros) || numeroDeMembros <= 0) {
//     console.log("Número de integrantes inválido.");
//     terminalInterface.close();
//     return;
//   }

//   const percentualPorIntegrante = 100 / numeroDeMembros;
//   const alunos = [];

//   for (let indice = 0; indice < numeroDeMembros; indice++) {
//     console.log(`\n--- Dados do aluno ${indice + 1} ---`);

//     const nomeDoAluno = await fazerUmaPergunta("Nome do aluno: ");

//     const participacao = await obterNotaValida("Participação: ");
//     const conhecimento = await obterNotaValida("Conhecimento: ");
//     const participacaoNaCompra = await obterNotaValida("Participação na compra: ");
//     const participacaoNoRelatorio = await obterNotaValida("Participação no relatório: ");

//     const somaDasNotas =
//       participacao +
//       conhecimento +
//       participacaoNaCompra +
//       participacaoNoRelatorio;

//     const mediaDoAluno = somaDasNotas / 4;
//     const percentagemFinal = calcularPercentagem(
//       mediaDoAluno,
//       percentualPorIntegrante
//     );

//     alunos.push({
//       ordem: indice + 1,
//       nome: nomeDoAluno,
//       percentagem: percentagemFinal,
//     });
//   }

//   imprimirTabela(alunos);

//   terminalInterface.close();
// }

// executar();