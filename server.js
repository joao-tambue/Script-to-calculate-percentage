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

    await fastify.register(require('@fastify/cors'), {
      origin: true
    })


    await fastify.listen({ port: 4000 });

    console.log("Servidor rodando em http://localhost:4000");
    console.log("Swagger disponível em http://localhost:4000/docs");
  } catch (erro) {
    fastify.log.error(erro);
    process.exit(1);
  }
}

iniciarServidor();
