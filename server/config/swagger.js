const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const swaggerAutogen = require('swagger-autogen')({openapi:'3.0.0'});


const options = {
  apis: ["./routes/*.js"], //Swagger 파일 연동
}

const doc = {
    info: {
      version: '1.0.0',            // by default: '1.0.0'
      title: '이기민의 API',              // by default: 'REST API'
      description: '프로젝트 설명 Node.js Swaager swagger-jsdoc 방식 RestFul API 클라이언트 UI'         // by default: ''
    },
    servers: [
      {
        url: 'http://localhost:5000',              // by default: 'http://localhost:3000'
        description: '개발 서버'       // by default: ''
      },
    ],
    tags: [                   // by default: empty Array
      {
        name: 'User API',             // Tag name
        description: '사용자 관련 API'       // Tag description
      },
    ]
  };
// const specs = swaggereJsdoc(options)

const outputFile = './config/swagger-output.json';
const endpointsFiles = ['./app.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);

// module.exports = { swaggerUi, specs }