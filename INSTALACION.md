# Guía Rápida de Instalación

## Requisitos Previos
- Node.js v18 o superior
- MySQL v8 o superior
- npm o yarn

## Pasos de Instalación

### 1. Backend
```bash
cd backend
npm install

# Configurar .env
cp .env.example .env
# Editar .env con tus credenciales de MySQL

# Crear base de datos
mysql -u root -p
CREATE DATABASE cachai_po;
exit;

# Configurar Prisma
npx prisma generate
npx prisma db push
npx prisma db seed

# Iniciar servidor
npm run start:dev
```

### 2. Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Verificación

- Backend: http://localhost:3000
- Frontend: http://localhost:8080

## Comandos Útiles

### Backend
```bash
# Ver base de datos con GUI
npx prisma studio

# Reiniciar base de datos
npx prisma migrate reset
```

### Frontend
```bash
# Build para producción
npm run build

# Preview de producción
npm run preview
```

## Troubleshooting

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo
- Verifica las credenciales en `.env`
- Verifica que la base de datos `cachai_po` exista

### Error de Prisma Client
```bash
cd backend
npx prisma generate
```

### Puerto ocupado
- Backend: Cambia `PORT` en `.env`
- Frontend: Cambia `port` en `vite.config.ts`
