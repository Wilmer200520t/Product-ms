# Products Microservice

Microservicio construido con NestJS y Prisma para gestionar productos usando SQLite local.

## Descripción

Este proyecto es un microservicio de productos basado en NestJS. Usa Prisma como ORM y SQLite como base de datos local con el adaptador `@prisma/adapter-better-sqlite3`.

## Características

- CRUD completo para productos
- Validación de datos con `class-validator`
- Persistencia con Prisma y SQLite
- Configuración de entorno validada con `joi`
- Prisma ejecutado desde `prisma.config.ts`

## Requisitos

- Node.js >= 24
- npm

## Instalación

```bash
npm install
```

## Configuración de variables de entorno

Crea un archivo `.env` en la raíz del proyecto con estas variables:

```env
APP_PORT=3001
DATABASE_URL="file:./prisma/dev.db"
```

## Generar Prisma Client

```bash
npx prisma generate
```

## Migraciones

Para aplicar la migración inicial:

```bash
npx prisma migrate dev --name init
```

Para reiniciar migraciones en desarrollo (borrar migraciones y la base de datos):

```bash
npx prisma migrate reset --force
```

## Ejecutar el proyecto

```bash
npm run start:dev
```

La API se ejecuta en `http://localhost:3001`.

## Endpoints disponibles

| Método | Ruta | Descripción |
| ------ | ---- | ----------- |
| POST | `/products` | Crear un producto |
| GET | `/products` | Listar todos los productos |
| GET | `/products/:id` | Obtener un producto por ID |
| PATCH | `/products/:id` | Actualizar un producto |
| DELETE | `/products/:id` | Eliminar un producto |

## Estructura clave

- `src/main.ts` → arranque de la aplicación Nest
- `src/app.module.ts` → módulo raíz
- `src/prisma/prisma.module.ts` → módulo global de Prisma
- `src/prisma/prisma.service.ts` → cliente Prisma con conexión SQLite
- `src/products/products.module.ts` → módulo de productos
- `src/products/products.service.ts` → lógica CRUD con Prisma
- `src/products/products.controller.ts` → rutas REST
- `prisma/schema.prisma` → modelo de datos
- `prisma.config.ts` → configuración del cliente Prisma

## Modelo de datos

El modelo `Product` contiene:

- `idproduct`: identificador entero auto-incremental
- `name`: nombre del producto
- `description`: descripción del producto
- `price`: precio del producto
- `createdAt`: fecha de creación
- `updatedAt`: fecha de actualización

## Notas

- `PrismaModule` es global y exporta `PrismaService` para que cualquier módulo lo use.
- `PrismaService` usa `PrismaBetterSqlite3` para conectar con SQLite.
- `src/configs/envs.ts` valida que `APP_PORT` y `DATABASE_URL` existan antes de iniciar.
- El archivo SQLite se almacena en `prisma/dev.db`.

## Problemas comunes

- Si la aplicación no arranca por falta de variables, verifica `.env`.
- Si `@prisma/client` no está generado, ejecuta `npx prisma generate`.
- Si encuentras migraciones corruptas, borra `prisma/migrations` y `prisma/dev.db`, luego vuelve a ejecutar `npx prisma migrate dev --name init`.
