# Cachai Po' Backend API

Backend API para la aplicación Cachai Po' - Traductor de modismos latinoamericanos.

## Tecnologías

- NestJS
- Prisma ORM
- MySQL
- TypeScript

## Configuración

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno:
- Copia `.env.example` a `.env`
- Actualiza la URL de conexión a MySQL:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/cachai_po"
```

3. Crea la base de datos en MySQL:
```sql
CREATE DATABASE cachai_po;
```

4. Genera Prisma Client y crea las tablas:
```bash
npx prisma generate
npx prisma db push
```

5. Pobla la base de datos con datos iniciales:
```bash
npx prisma db seed
```

6. Inicia el servidor:
```bash
npm run start:dev
```

El servidor estará corriendo en `http://localhost:3000`

## Scripts Disponibles

- `npm run start:dev` - Iniciar en modo desarrollo con hot-reload
- `npm run build` - Compilar para producción
- `npm run start:prod` - Iniciar en modo producción
- `npx prisma studio` - Abrir Prisma Studio (GUI para la DB)
- `npx prisma generate` - Generar Prisma Client
- `npx prisma db push` - Sincronizar schema con la base de datos
- `npx prisma db seed` - Ejecutar seed de datos iniciales

## Endpoints API

### Countries
- `GET /countries` - Obtener todos los países
- `GET /countries/:code` - Obtener país por código
- `POST /countries/seed` - Inicializar países

### Translations
- `POST /translations/translate` - Traducir texto
- `GET /translations` - Obtener todas las traducciones
- `POST /translations` - Crear nueva traducción

### Dictionary
- `GET /dictionary` - Obtener todas las entradas del diccionario
- `GET /dictionary/user/:userId` - Obtener diccionario de un usuario
- `POST /dictionary` - Crear entrada en diccionario
- `DELETE /dictionary/:id` - Eliminar entrada del diccionario

### User Settings
- `GET /user-settings/:userId` - Obtener configuración de usuario
- `POST /user-settings` - Crear/actualizar configuración de usuario

## Estructura del Proyecto

```
backend/
├── src/
│   ├── countries/       # Módulo de países
│   ├── translations/    # Módulo de traducciones
│   ├── dictionary/      # Módulo de diccionario
│   ├── user-settings/   # Módulo de configuración de usuario
│   ├── database/        # Configuración de base de datos
│   └── main.ts          # Punto de entrada
├── .env                 # Variables de entorno
└── package.json
```
