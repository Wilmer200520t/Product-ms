import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { envs } from "./configs";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envs.APP_PORT,
    },
  });

  //** Configuraciones globales, como CORS, prefijos de ruta, etc., se pueden agregar aquí **//
  // Configuracion Validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas
      transform: true, // Transforma los payloads a los tipos definidos en los DTOs
    }),
  );

  await app.listen();
  Logger.log(
    `Product Microservice running on port ${envs.APP_PORT}`,
    "AppProducts",
  );
}
bootstrap();
