import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { envs } from "./configs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //** Configuraciones globales, como CORS, prefijos de ruta, etc., se pueden agregar aquí **//
  // Configuracion Validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas
      transform: true, // Transforma los payloads a los tipos definidos en los DTOs
    }),
  );

  await app.listen(envs.APP_PORT);
}
bootstrap();
