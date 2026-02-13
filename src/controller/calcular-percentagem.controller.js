const { executarCalculoDePercentagem } = require("../service/calcular-percentagem.service");

async function calcularPercentagemController(fastify) {
  fastify.post(
    "/calcular-percentagem",
    {
      schema: {
        tags: ["Percentagem"],
        summary: "Calcula a percentagem de cada aluno no grupo",
        description: "Recebe uma lista de alunos e retorna a percentagem individual baseada nas notas.",
        body: {
          type: "object",
          required: ["alunos"],
          properties: {
            alunos: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: [
                  "nome",
                  "participacao",
                  "conhecimento",
                  "participacaoNaCompra",
                  "participacaoNoRelatorio",
                ],
                properties: {
                  nome: {
                    type: "string",
                    example: "João",
                  },
                  participacao: {
                    type: "number",
                    minimum: 0,
                    maximum: 20,
                    example: 18,
                  },
                  conhecimento: {
                    type: "number",
                    minimum: 0,
                    maximum: 20,
                    example: 17,
                  },
                  participacaoNaCompra: {
                    type: "number",
                    minimum: 0,
                    maximum: 20,
                    example: 19,
                  },
                  participacaoNoRelatorio: {
                    type: "number",
                    minimum: 0,
                    maximum: 20,
                    example: 16,
                  },
                },
              },
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              resultado: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ordem: { type: "number", example: 1 },
                    nome: { type: "string", example: "João" },
                    percentagem: { type: "number", example: 23.75 },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { alunos } = request.body;
      const resultado = executarCalculoDePercentagem(alunos);

      return { resultado };
    }
  );
}

module.exports = calcularPercentagemController;