
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Client Service API',
            version: '1.0.0',
            description: 'A simple Client serice API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        Components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{  bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);