const readline = require("readline")

const terminalIterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/**
 * Faz uma pergunta no terminal
 * @param {string} question
 * @returns {Promise<string>}
 */

function fazerUmaPerguntar (pergunta) {
    return new Promise((resolve) => {
        terminalIterface.question(pergunta, resolve);
    });
}

/**
 * Solicita um valor numérico validado
 * @param {string} message
 * @returns {Promise<number>}
 */
async function NotaDeCadaAvaliacao(message) {
    while (true) {
        const input = await fazerUmaPerguntar(message);
        const ValorDoAluno = Number(input);

        if (!isNaN(ValorDoAluno) && ValorDoAluno >= 0 && ValorDoAluno <= 20) {
            return ValorDoAluno
        }

        console.log("Valor Invalido. Digite um número entre 0 e 20.");
    }
}

/**
 * Executa o calculo principal
 */
async function executar () {
    console.log("\n===== CALCULO DE PERCENTAGEM DO ALUNO =====\n");

    const numeroDosMembros = Number(
        await fazerUmaPerguntar("Digite o numero de integrandes do grupo: ")
    );

    if (isNaN(numeroDosMembros) || numeroDosMembros <= 0) {
        console.log("Numero de integrantes invalido.");
        terminalIterface.close();
        return;
    }

    const percentualPorIntegrante = 100/numeroDosMembros;

    console.log("\nDifite os valores do aluno (0 a 20)\n");

    const participacao = await NotaDeCadaAvaliacao("Participação: ");
    const conhecimento = await NotaDeCadaAvaliacao("Conhecimento: ");
    const participacaoNaCompra = await NotaDeCadaAvaliacao("Participação na compra: ");
    const participacaoNoRelatorio = await NotaDeCadaAvaliacao("Participação no relatiorio: ");

    const somaDasNotas = participacao + conhecimento + participacaoNaCompra + participacaoNoRelatorio;

    const resuladoDaSoma = somaDasNotas/4;

    const percentualDoAluno = (resuladoDaSoma*percentualPorIntegrante)/20;

    console.log("\n===== RESULTADO =====");
    console.log(`Total das notas: ${somaDasNotas}`);
    console.log(`Media do alumo: ${resuladoDaSoma.toFixed(2)}`);
    console.log(`Percentagem dinal do aluno: ${percentualDoAluno.toFixed(2)}%`);

    terminalIterface.close();
};

executar();