# Cachai Po' - Traductor de Modismos Latinoamericanos

Aplicación web para traducir expresiones y modismos entre diferentes países latinoamericanos.

## Estructura del Proyecto

```
Cachai-Po-/
├── frontend/          # Aplicación React + Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # API NestJS
│   ├── src/
│   ├── prisma/
│   └── package.json
└── README.md
```

### Frontend
- **Tecnología**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Puerto**: 8080

### Backend
- **Tecnología**: NestJS + TypeScript
- **Base de datos**: MySQL + Prisma ORM
- **Puerto**: 3000

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <YOUR_GIT_URL>
cd Cachai-Po-
```

### 2. Backend

```bash
cd backend
npm install
```

Configura las variables de entorno:
- Copia `backend/.env.example` a `backend/.env`
- Actualiza las credenciales de MySQL:

```env
DATABASE_URL="mysql://root:tu_contraseña@localhost:3306/cachai_po"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

Crea la base de datos y ejecuta las migraciones:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

Inicia el servidor backend:
```bash
npm run start:dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:8080`

## Endpoints API

### Countries
- `GET /countries` - Obtener todos los países
- `POST /countries/seed` - Inicializar países

### Translations
- `POST /translations/translate` - Traducir texto
- `GET /translations` - Historial de traducciones

### Dictionary
- `GET /dictionary` - Todas las entradas
- `GET /dictionary/user/:userId` - Diccionario por usuario
- `POST /dictionary` - Agregar palabra
- `DELETE /dictionary/:id` - Eliminar entrada

### User Settings
- `GET /user-settings/:userId` - Obtener configuración
- `POST /user-settings` - Guardar configuración

## Características

- ✅ Traducción de modismos entre países latinos
- ✅ Modo de voz y texto
- ✅ Diccionario personal
- ✅ Configuración de usuario
- ✅ Múltiples países soportados (Chile, México, Argentina, Colombia, etc.)
- ✅ Equivalencias palabra por palabra
- ✅ Historial de traducciones

## Base de Datos

El backend utiliza Prisma ORM con MySQL.

### Modelos:
- `Country` - Países disponibles
- `Translation` - Historial de traducciones
- `DictionaryEntry` - Diccionario personal de usuarios
- `UserSettings` - Configuración de usuarios

## Scripts Disponibles

### Backend
- `npm run start:dev` - Iniciar en modo desarrollo
- `npm run build` - Compilar proyecto
- `npx prisma studio` - Abrir Prisma Studio (GUI para la DB)
- `npx prisma migrate dev` - Crear nueva migración

### Frontend
- `npm run dev` - Iniciar en modo desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Vista previa de producción
