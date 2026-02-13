const {
  calcularMediaDoAluno,
  calcularPercentagemDoAluno,
} = require("../domain/aluno.domain");

/**
 * Executa o cálculo da percentagem do grupo
 * @param {Array<object>} alunos
 * @returns {Array<object>}
 */
function executarCalculoDePercentagem(alunos) {
  const percentualPorIntegrante = 100 / alunos.length;

  return alunos.map((aluno, indice) => {
    const mediaDoAluno = calcularMediaDoAluno(aluno);
    const percentagemFinal = calcularPercentagemDoAluno(
      mediaDoAluno,
      percentualPorIntegrante
    );

    return {
      ordem: indice + 1,
      nome: aluno.nome,
      percentagem: percentagemFinal,
    };
  });
}

module.exports = {
  executarCalculoDePercentagem,
};