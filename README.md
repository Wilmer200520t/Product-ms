# Products Microservice 🚀

Microservicio de gestión de productos construido con **NestJS**, **Prisma** y **SQLite**, diseñado como servicio independiente con comunicación TCP para arquitecturas de microservicios.

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Descripción del Microservicio](#descripción-del-microservicio)
- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Base de Datos](#base-de-datos)
- [Ejecución](#ejecución)
- [Endpoints Disponibles](#endpoints-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelo de Datos](#modelo-de-datos)
- [Testing](#testing)
- [Despliegue](#despliegue)
- [Troubleshooting](#troubleshooting)

---

## 📝 Descripción General

Este es un **microservicio independiente** que gestiona el catálogo de productos de un sistema distribuido. Se comunica con otros servicios a través del protocolo **TCP** de NestJS, permitiendo escalabilidad y separación de responsabilidades en arquitecturas de microservicios.

---

## 🔧 Descripción del Microservicio

### ¿Qué hace?

El microservicio de Productos proporciona:

- **Gestión completa de productos** (CRUD)
- **Validación rigurosa de datos** en todas las operaciones
- **Persistencia de datos** con SQLite + Prisma ORM
- **Transporte TCP** para comunicación entre microservicios
- **Versionado automático** de registros (createdAt, updatedAt)
- **Control de habilitación** de productos

### Casos de uso

- Consulta de catálogo de productos desde otros servicios
- Gestión centralizada del inventario de productos
- Servicio de referencia para aplicaciones backend

---

## ✨ Características

- ✅ CRUD completo para productos
- ✅ Validación de datos con `class-validator` y `class-transformer`
- ✅ Persistencia con Prisma ORM + SQLite
- ✅ Configuración de entorno validada con `joi`
- ✅ Transporte TCP para microservicios
- ✅ Validación global de pipes
- ✅ Prisma Client generado y configurado desde `prisma.config.ts`
- ✅ Migraciones automáticas y reproducibles

---

## 📦 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

| Tecnología  | Versión | Propósito              |
| ----------- | ------- | ---------------------- |
| **Node.js** | >= 24   | Runtime de JavaScript  |
| **npm**     | >= 10   | Gestor de dependencias |
| **Git**     | Latest  | Control de versiones   |

### Verificar instalación

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <https://github.com/Wilmer200520t/Product-ms.git>
cd products-ms
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias del proyecto:

- `@nestjs/core` y módulos de NestJS
- `@prisma/client` y adaptador SQLite
- `class-validator` y `class-transformer`
- `joi` para validación de configuración
- Dependencias de desarrollo (ESLint, Jest, Prettier)

### 3. Verificar instalación exitosa

```bash
npm list
```

---

## ⚙️ Configuración

### 1. Crear archivo de variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.template .env
```

### 2. Configurar variables de entorno

Abre el archivo `.env` y completa las variables:

```env
# Puerto del microservicio TCP
APP_PORT=3001

# URL de base de datos SQLite
# Usará ./prisma/dev.db por defecto
DATABASE_URL="file:./prisma/dev.db"

# Opcional: para desarrollo avanzado
NODE_ENV=development
```

**Explicación de variables:**

| Variable       | Descripción                               | Ejemplo                      |
| -------------- | ----------------------------------------- | ---------------------------- |
| `APP_PORT`     | Puerto TCP donde escucha el microservicio | `3001`                       |
| `DATABASE_URL` | Ruta de la base de datos SQLite           | `file:./prisma/dev.db`       |
| `NODE_ENV`     | Ambiente de ejecución                     | `development` o `production` |

### 3. Validación de configuración

La configuración se valida automáticamente al iniciar. Si hay errores, se mostrarán en la consola.

---

## 🗄️ Base de Datos

### 1. Generar Prisma Client

El cliente de Prisma se genera en `src/generated/prisma`:

```bash
npx prisma generate
```

### 2. Crear la base de datos e inicializar migraciones

**Primera vez (desarrollo):**

```bash
# Crear la base de datos y ejecutar migraciones
npx prisma migrate dev --name init
```

Esto:

- ✅ Crea el archivo `prisma/dev.db`
- ✅ Ejecuta todas las migraciones
- ✅ Genera el Prisma Client

**Agregar nuevas migraciones después de cambios en `schema.prisma`:**

```bash
npx prisma migrate dev --name nombre_descriptivo_migracion
```

### 3. Reiniciar la base de datos (⚠️ solo desarrollo)

Para limpiar la base de datos y revertir todo:

```bash
# ⚠️ CUIDADO: Borra todos los datos
npx prisma migrate reset --force
```

### 4. Ver datos en interfaz gráfica (opcional)

Abre Prisma Studio para visualizar y editar datos:

```bash
npx prisma studio
```

Se abrirá en `http://localhost:5555`

### Estructura de migraciones

Las migraciones se guardan en `prisma/migrations/`:

```
prisma/
├── migrations/
│   ├── migration_lock.toml
│   └── 20250504000000_init/
│       └── migration.sql
├── dev.db
└── schema.prisma
```

---

## ▶️ Ejecución

### Desarrollo (con watch mode)

```bash
npm run start:dev
```

**Salida esperada:**

```
[Nest] 12345 - 05/04/2025, 10:30:00 AM     LOG [AppProducts] Product Microservice running on port 3001
```

### Depuración (debug mode)

```bash
npm run start:debug
```

Se iniciará en modo debug en puerto `9229` para conectar con debuggers externos.

### Producción

Primero, compilar el proyecto:

```bash
npm run build
```

Luego, ejecutar:

```bash
npm run start:prod
```

O directamente:

```bash
node dist/main
```

### Parar el servicio

Presiona `Ctrl + C` en la terminal.

---

## 📡 Endpoints Disponibles

El microservicio expone los siguientes endpoints TCP (disponibles para otros servicios):

### Products Controller

| Método     | Ruta      | Descripción                | Body                                        |
| ---------- | --------- | -------------------------- | ------------------------------------------- |
| **POST**   | `create`  | Crear un nuevo producto    | `{ name, description, price }`              |
| **GET**    | `findAll` | Listar todos los productos | -                                           |
| **GET**    | `findOne` | Obtener producto por ID    | -                                           |
| **PATCH**  | `update`  | Actualizar un producto     | `{ name?, description?, price?, enabled? }` |
| **DELETE** | `remove`  | Eliminar un producto       | -                                           |

### Ejemplos de uso desde otro servicio

```typescript
// En otro microservicio, inyecta el ClientProxy
import { ClientProxy } from '@nestjs/microservices';

constructor(@Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy) {}

// Llamar a método
this.productsClient.send('create', {
  name: 'Laptop',
  description: 'Gaming Laptop',
  price: 1500
}).toPromise();

this.productsClient.send('findAll', {}).toPromise();
```

---

## 📁 Estructura del Proyecto

```
products-ms/
├── src/
│   ├── main.ts                          # Punto de entrada, configuración TCP
│   ├── app.module.ts                    # Módulo raíz de la aplicación
│   ├── configs/
│   │   └── envs.ts                      # Variables de entorno validadas
│   ├── prisma/
│   │   ├── prisma.module.ts             # Módulo global de Prisma
│   │   └── prisma.service.ts            # Servicio de conexión a base de datos
│   ├── products/
│   │   ├── products.module.ts           # Módulo de productos
│   │   ├── products.controller.ts       # Controlador (pattern handlers)
│   │   ├── products.service.ts          # Lógica de negocio (CRUD)
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts    # Validación entrada crear
│   │   │   └── update-product.dto.ts    # Validación entrada actualizar
│   │   └── entities/
│   │       └── product.entity.ts        # Entidad Product
│   └── generated/
│       └── prisma/                      # Prisma Client generado
├── prisma/
│   ├── schema.prisma                    # Modelo de datos
│   ├── dev.db                           # Base de datos SQLite
│   └── migrations/                      # Historial de migraciones
├── test/
│   ├── app.e2e-spec.ts                  # Tests end-to-end
│   └── jest-e2e.json                    # Configuración Jest E2E
├── dist/                                # Código compilado (generado)
├── .env                                 # Variables de entorno (no versionar)
├── .env.template                        # Plantilla de variables
├── .gitignore                           # Archivos ignorados por Git
├── package.json                         # Dependencias y scripts
├── tsconfig.json                        # Configuración TypeScript
├── nest-cli.json                        # Configuración NestJS CLI
├── prisma.config.ts                     # Configuración de Prisma Client
└── README.md                            # Este archivo
```

### Archivos clave explicados

| Archivo                        | Propósito                                       |
| ------------------------------ | ----------------------------------------------- |
| `src/main.ts`                  | Inicializa NestFactory como microservicio TCP   |
| `src/app.module.ts`            | Importa todos los módulos (Prisma, Products)    |
| `prisma/schema.prisma`         | Define modelo de datos Product                  |
| `src/configs/envs.ts`          | Carga y valida variables de entorno con joi     |
| `src/prisma/prisma.service.ts` | Proporciona cliente Prisma a toda la aplicación |

---

## 🗄️ Modelo de Datos

### Entidad Product

```prisma
model Product {
  idproduct   Int      @default(autoincrement()) @id @map("idproduct")
  name        String
  description String
  price       Float
  enabled     Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Descripción de campos

| Campo         | Tipo       | Descripción                                |
| ------------- | ---------- | ------------------------------------------ |
| `idproduct`   | `Int` (PK) | ID único auto-incremental                  |
| `name`        | `String`   | Nombre del producto (requerido)            |
| `description` | `String`   | Descripción del producto (requerido)       |
| `price`       | `Float`    | Precio del producto (requerido)            |
| `enabled`     | `Boolean`  | Si el producto está activo (default: true) |
| `createdAt`   | `DateTime` | Timestamp de creación (auto)               |
| `updatedAt`   | `DateTime` | Timestamp de última actualización (auto)   |

### DTOs (Data Transfer Objects)

#### CreateProductDto

```typescript
{
  name: string; // Requerido, no vacío
  description: string; // Requerido, no vacío
  price: number; // Requerido, número positivo
}
```

#### UpdateProductDto

```typescript
{
  name?: string;
  description?: string;
  price?: number;
  enabled?: boolean;
}
```

---

## 🧪 Testing

### Ejecutar tests unitarios

```bash
npm run test
```

### Ejecutar tests en modo watch

```bash
npm run test:watch
```

Re-ejecuta tests automáticamente al hacer cambios.

### Coverage de tests

```bash
npm run test:cov
```

Genera reporte de cobertura de tests.

### Tests end-to-end (E2E)

```bash
npm run test:e2e
```

Prueba toda la aplicación integrada.

---

## 🚢 Despliegue

### Compilar para producción

```bash
npm run build
```

Genera la carpeta `dist/` con el código compilado y optimizado.

### Opciones de despliegue

#### 1. **Ejecución directa en servidor**

```bash
# En el servidor
npm install --production
npm run build
npm run start:prod
```

## 🔍 Troubleshooting

### Problema: "Puerto 3001 ya está en uso"

```bash
# Buscar proceso usando el puerto
netstat -ano | findstr :3001  # Windows
lsof -i :3001                  # macOS/Linux

# Matar el proceso (Windows)
taskkill /PID <PID> /F

# O usar un puerto diferente
APP_PORT=3002 npm run start:dev
```

### Problema: "Error: ENOENT: no such file or directory, open 'prisma/dev.db'"

```bash
# Generar Prisma Client y crear base de datos
npx prisma migrate dev --name init
```

### Problema: "ValidationError: child \"name\" fails because [\"name\" is required]"

La validación rechazó el payload. Verifica que envíes todos los campos requeridos en el body.

### Problema: "Microservice is not running" en otro servicio

- Verifica que el puerto `APP_PORT` sea accesible desde el otro servicio
- Confirma que el servicio está escuchando: `npm run start:dev`
- Revisa los logs para errores

### Problema: Cambios en `schema.prisma` no se reflejan

```bash
# Regenerar Prisma Client
npx prisma generate

# Crear migración si hay cambios estructurales
npx prisma migrate dev --name descripcion_cambio
```

---

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Microservicios en NestJS](https://docs.nestjs.com/microservices/basics)
- [SQLite](https://www.sqlite.org)

---

## 📄 Licencia

UNLICENSED

---

## ✏️ Notas importantes

- `PrismaModule` es **global** y exporta `PrismaService` para que cualquier módulo lo use sin importar explícitamente
- La base de datos SQLite se sincroniza automáticamente en desarrollo con `npm run start:dev`
- Los datos persisten en `prisma/dev.db` incluso después de reiniciar el servicio
- Para producción, considera usar una base de datos más robusta (PostgreSQL, MySQL)
- `PrismaService` usa `PrismaBetterSqlite3` para conectar con SQLite.
- `src/configs/envs.ts` valida que `APP_PORT` y `DATABASE_URL` existan antes de iniciar.
- El archivo SQLite se almacena en `prisma/dev.db`.

## Problemas comunes

- Si la aplicación no arranca por falta de variables, verifica `.env`.
- Si `@prisma/client` no está generado, ejecuta `npx prisma generate`.
- Si encuentras migraciones corruptas, borra `prisma/migrations` y `prisma/dev.db`, luego vuelve a ejecutar `npx prisma migrate dev --name init`.
