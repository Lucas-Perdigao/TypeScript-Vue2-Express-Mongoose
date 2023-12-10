import swaggerJsdoc from "swagger-jsdoc"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reserva BP",
      version: "1.0.0",
      description: "Sistema para agendamento entre clientes e corretores da Bem Protege.",
    },
  },
  apis: ["./src/modules/**/routes/*.ts"],
};

export const swaggerSpecs = swaggerJsdoc(swaggerOptions);