const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Store API",
      version: "1.0.0",
      description: "Simple ecommerce API for assignment with cart, checkout & discount logic."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local dev server"
      }
    ]
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
