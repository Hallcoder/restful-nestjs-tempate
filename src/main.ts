import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Swagger Grab and Go')
    .setDescription('The NestJS template API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    ) 
    .build();
    const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}
const logFile = path.join(logsDirectory, 'app.log');
console.log(__dirname)
const logStream = fs.createWriteStream(logFile);

// Create pino logger instance
const logger = pino({
  level: process.env.LOG_LEVEL || 'info', // Adjust log level as needed
  timestamp: pino.stdTimeFunctions.isoTime, // Include timestamp
  // prettyPrint: true, // Enable pretty printing for console output
}, pino.destination({ dest: logFile }));

app.use(pinoHttp({ logger }))
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
