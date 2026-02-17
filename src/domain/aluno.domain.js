/**
 * @param {object} aluno
 * @returns {number}
 */
function calcularMediaDoAluno(aluno) {
  const somaDasNotas =
    aluno.participacao +
    aluno.conhecimento +
    aluno.participacaoNaCompra +
    aluno.participacaoNoRelatorio;

  return somaDasNotas / 4;
}

/**
 * @param {number} mediaDoAluno
 * @param {number} percentualPorIntegrante
 * @returns {number}
 */
function calcularPercentagemDoAluno(mediaDoAluno, percentualPorIntegrante) {
  return (mediaDoAluno * percentualPorIntegrante) / 20;
}

module.exports = {
  calcularMediaDoAluno,
  calcularPercentagemDoAluno,
};