const fastify = require("fastify")({
  logger: true,
  ajv: {
    customOptions: {
      strict: false,
    },
  },
});

const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

const calcularPercentagemController = require("./src/controller/calcular-percentagem.controller");

async function iniciarServidor() {
  try {
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "API de Cálculo de Percentagem",
          version: "1.0.0",
        },
      },
      mode: "dynamic",
    });

    await fastify.register(swaggerUI, {
      routePrefix: "/docs",
    });

    await fastify.register(calcularPercentagemController, {
      prefix: "/v1",
    });

    await fastify.register(require("@fastify/cors"), {
      origin: true,
    });

    const port = Number(process.env.PORT) || 4000;
    const host = "0.0.0.0";

    await fastify.listen({
      port,
      host,
    });

    fastify.log.info(`Servidor rodando na porta ${port}`);
    fastify.log.info(`Documentação disponível em http://${host}:${port}/docs`);
  } catch (erro) {
    fastify.log.error(erro);
    process.exit(1);
  }
}


iniciarServidor();
