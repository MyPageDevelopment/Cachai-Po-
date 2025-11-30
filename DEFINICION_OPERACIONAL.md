# Definición Operacional del Producto
## Plataforma Cachai'Po - Sistema de Traducción de Modismos Latinoamericanos

---

## 1. DESCRIPCIÓN DEL PRODUCTO/SERVICIO

**Cachai'Po** es una plataforma web progresiva (PWA) que permite a usuarios de diferentes países latinoamericanos traducir modismos, jergas y expresiones coloquiales de una región a otra en tiempo real, utilizando tanto entrada de texto como reconocimiento de voz.

---

## 2. INSUMOS Y CAPACIDADES PRINCIPALES REQUERIDAS

### 2.1 Recursos Humanos

**Equipo de Desarrollo:**
- 1 Desarrollador Full-Stack (React/NestJS)
- 1 Diseñador UI/UX
- 1 Lingüista especializado en español latinoamericano
- 1 QA/Tester

**Equipo de Contenido:**
- Colaboradores nativos de cada país (10 países)
- Lingüistas para validación de modismos
- Moderadores de contenido comunitario

### 2.2 Recursos Tecnológicos

**Infraestructura de Backend:**
- Servidor Node.js v18+ con NestJS 10.0.0
- Base de datos MySQL 8.0+
- ORM Prisma 5.7.0
- Servidor HTTP/HTTPS con SSL
- Capacidad de procesamiento: mínimo 2GB RAM, 2 CPU cores

**Infraestructura de Frontend:**
- Servidor web estático (Nginx/Apache) o CDN
- Compilador Vite 5.4.19
- Framework React 18.3.1 con TypeScript 5.6.2
- Biblioteca de componentes Shadcn/UI

**Almacenamiento:**
- Base de datos relacional para usuarios y diccionarios personales
- Archivo de texto plano para base de modismos (639+ entradas)
- Caché Redis (opcional) para optimización

**APIs y Servicios Externos:**
- Web Speech API (nativa del navegador, sin costo)
- Certificado SSL para HTTPS (requerido para reconocimiento de voz)

### 2.3 Recursos de Información

**Base de Datos de Modismos:**
- 639+ modismos catalogados actualmente
- Cobertura de 10 países: Chile, México, Argentina, Colombia, Venezuela, España, Perú, Uruguay, Ecuador, Puerto Rico
- Estructura: palabra_origen | país_origen | palabra_destino | país_destino | contexto
- Formato de archivo: texto plano delimitado por pipes (|)

**Metadatos de Países:**
- Código ISO (2 letras)
- Nombre completo
- Emoji de bandera
- Variante de español (es-CL, es-MX, es-AR, etc.)

### 2.4 Capacidades Técnicas Requeridas

**Para el Producto:**
- Reconocimiento de voz en navegador (Web Speech API)
- Procesamiento de lenguaje natural básico
- Algoritmo de detección de frases multi-palabra (hasta 3 palabras)
- Sistema de indexación para búsqueda O(1)
- Almacenamiento local del navegador (localStorage)

**Para la Infraestructura:**
- Conexión a internet estable (servidor)
- Ancho de banda: mínimo 100 Mbps
- Uptime: 99.5% SLA recomendado
- Backup diario de base de datos

---

## 3. PROCESO DE OBTENCIÓN (CREACIÓN) DEL PRODUCTO

### 3.1 Fase de Investigación y Análisis (2 semanas)

**Actividades:**
1. **Investigación de mercado**
   - Identificación de usuarios objetivo (viajeros, estudiantes, trabajadores remotos)
   - Análisis de plataformas competidoras
   - Validación de necesidad del producto

2. **Recopilación inicial de modismos**
   - Investigación en fuentes confiables (diccionarios, estudios lingüísticos)
   - Encuestas a nativos de cada país
   - Validación por lingüistas

3. **Definición de requisitos técnicos**
   - Especificación de funcionalidades core
   - Arquitectura del sistema
   - Stack tecnológico

**Entregables:**
- Documento de requisitos del producto
- Base de datos inicial con 100+ modismos
- Arquitectura técnica documentada

### 3.2 Fase de Diseño (1 semana)

**Actividades:**
1. **Diseño de interfaz de usuario**
   - Wireframes de pantallas principales
   - Sistema de diseño (colores bandera chilena: rojo, azul, blanco)
   - Flujos de navegación

2. **Diseño de base de datos**
   - Modelo entidad-relación
   - Schema de Prisma
   - Diseño de índices

3. **Diseño de API**
   - Definición de endpoints
   - Estructura de request/response
   - Documentación OpenAPI/Swagger

**Entregables:**
- Mockups en Figma/Adobe XD
- Diagrama de base de datos
- Documentación de API

### 3.3 Fase de Desarrollo (4 semanas)

**Sprint 1 - Backend Core (1 semana):**
- Configuración de NestJS y Prisma
- Implementación de modelos de datos
- API de países y configuración

**Sprint 2 - Sistema de Modismos (1 semana):**
- ModismoLoaderService para carga dinámica
- TranslationsService con algoritmo de detección
- Endpoints de traducción, búsqueda y exploración

**Sprint 3 - Frontend Base (1 semana):**
- Configuración de React + Vite
- Componentes UI base (Header, BottomNav, CountrySelector)
- Modo texto con traducción

**Sprint 4 - Reconocimiento de Voz (1 semana):**
- Hook useSpeechRecognition
- Componentes VoiceMode y VoiceRecording
- Integración con API de traducción

**Actividades Paralelas:**
- Testing unitario de servicios
- Testing de integración de API
- Expansión continua de base de modismos

**Entregables:**
- Código fuente en repositorio Git
- Backend funcional con 9 endpoints
- Frontend con 4 modos de operación
- Base de datos con 639+ modismos

### 3.4 Fase de Testing y QA (1 semana)

**Actividades:**
1. **Testing funcional**
   - Pruebas de traducción en los 10 países
   - Validación de reconocimiento de voz
   - Pruebas de diccionario personal

2. **Testing de compatibilidad**
   - Chrome, Edge, Safari, Opera
   - Desktop y mobile
   - Diferentes configuraciones de micrófono

3. **Testing de performance**
   - Tiempo de carga < 3 segundos
   - Traducción en < 500ms
   - Reconocimiento de voz en tiempo real

4. **Testing de seguridad**
   - Validación de inputs
   - Protección contra inyección SQL
   - Sanitización de datos

**Entregables:**
- Reporte de bugs y fixes
- Documento de casos de prueba
- Métricas de performance

### 3.5 Fase de Documentación (3 días)

**Actividades:**
- Creación de documentación técnica
- Guía de usuario
- Guía de contribución de modismos
- README y licencias

**Entregables:**
- MODIFICACIONES.md (cambios técnicos)
- GUIA_DE_USO.md (manual de usuario)
- EJEMPLOS_MODISMOS.md (frases de prueba)
- RECONOCIMIENTO_DE_VOZ.md (guía de voz)

---

## 4. PROCESO DE GENERACIÓN DEL SERVICIO

### 4.1 Configuración Inicial del Sistema

**Backend:**
```bash
1. Instalación de dependencias (npm install)
2. Configuración de variables de entorno (.env)
3. Migración de base de datos (npx prisma migrate)
4. Seed de datos iniciales (países)
5. Carga de modismos desde archivo de texto
6. Inicio del servidor en puerto 3000
```

**Frontend:**
```bash
1. Instalación de dependencias (npm install)
2. Configuración de URL de API
3. Build de producción (npm run build)
4. Despliegue en servidor web/CDN
```

**Tiempo de setup:** 30-45 minutos

### 4.2 Flujo de Operación del Servicio

#### Modo Traducción de Texto:

**Input:** Texto escrito por el usuario

**Proceso:**
1. Usuario selecciona país origen y país destino
2. Usuario ingresa texto en el input
3. Frontend envía petición POST a `/translations/translate`
4. Backend procesa el texto:
   - Tokenización palabra por palabra
   - Detección de frases multi-palabra (3 palabras, 2 palabras, 1 palabra)
   - Búsqueda en índice de modismos
   - Construcción de respuesta con equivalencias
5. Frontend recibe traducción y la muestra
6. Usuario puede guardar en su diccionario personal

**Output:** Texto traducido con palabras equivalentes resaltadas

**Tiempo promedio:** < 500ms

#### Modo Reconocimiento de Voz:

**Input:** Voz del usuario capturada por micrófono

**Proceso:**
1. Usuario selecciona país origen y país destino
2. Usuario presiona botón de micrófono
3. Navegador solicita permisos de micrófono (primera vez)
4. Web Speech API inicia captura:
   - Audio → Texto en tiempo real
   - Mostrar transcripción provisional
   - Mostrar transcripción confirmada
5. Usuario detiene grabación
6. Frontend envía texto transcrito a API
7. Proceso de traducción (igual que modo texto)
8. Frontend muestra resultados

**Output:** Texto transcrito y traducido

**Tiempo promedio:** Captura en tiempo real + traducción < 500ms

#### Modo Explorador de Modismos:

**Input:** Búsqueda de palabra o selección de país

**Proceso:**
1. Usuario accede desde Diccionario → "Explorar Modismos"
2. Dos modos de búsqueda:
   - **Por país:** GET `/translations/country/:code`
   - **Por palabra:** GET `/translations/search?q=palabra`
3. Backend consulta índice de modismos
4. Retorna resultados agrupados por palabra origen
5. Frontend muestra en cards organizadas

**Output:** Lista de modismos con traducciones a otros países

**Tiempo promedio:** < 200ms

### 4.3 Gestión de Datos del Usuario

**Diccionario Personal:**
1. Usuario marca palabra como favorita
2. POST `/dictionary` con datos de la traducción
3. Se almacena en MySQL asociado al userId
4. Disponible en sección "Mi Diccionario"
5. Usuario puede eliminar entradas (DELETE `/dictionary/:id`)

**Configuración de Usuario:**
1. Usuario configura preferencias en Settings
2. POST `/user-settings` guarda:
   - Nombre
   - Email
   - País de origen predeterminado
   - Modo tiempo real (on/off)
   - Velocidad de lectura
   - Tema oscuro
   - Idioma de interfaz
3. Datos almacenados en MySQL
4. Recuperados en próximas sesiones

---

## 5. PROCESO DE ENTREGA Y DISTRIBUCIÓN

### 5.1 Modalidad de Entrega

**Tipo:** Plataforma Web Progresiva (PWA)

**Canales de acceso:**
1. **Navegador Web**
   - URL directa: https://cachaipo.com (ejemplo)
   - Compatible con Chrome, Edge, Safari, Opera
   - Responsive: Desktop, tablet, mobile

2. **Instalación como App (PWA)**
   - Usuario puede "Agregar a pantalla de inicio"
   - Funciona como app nativa
   - Icono en dispositivo móvil/desktop

### 5.2 Arquitectura de Distribución

**Modelo Cliente-Servidor:**

```
[Cliente]                    [Servidor]
  ↓                              ↓
React App                  NestJS API
(Puerto 8080)            (Puerto 3000)
  ↓                              ↓
Navegador      ←→ HTTP/HTTPS ←→  MySQL DB
  ↓                              ↓
Web Speech API           Archivo modismos.txt
(Local)                    (639 entradas)
```

**Despliegue Recomendado:**

**Frontend:**
- **Opción 1:** CDN (Vercel, Netlify, Cloudflare Pages)
  - Deploy automático desde Git
  - SSL incluido
  - Distribución global
  
- **Opción 2:** Servidor propio
  - Nginx/Apache
  - Certificado Let's Encrypt
  - Build estático en `/dist`

**Backend:**
- **Opción 1:** VPS (DigitalOcean, AWS EC2, Linode)
  - Docker container
  - PM2 para gestión de procesos
  - Nginx como proxy inverso
  
- **Opción 2:** PaaS (Heroku, Railway, Render)
  - Deploy automático
  - Escalado automático
  - Base de datos incluida

**Base de Datos:**
- MySQL 8.0 en servidor dedicado
- Backups automáticos diarios
- Réplicas para alta disponibilidad (opcional)

### 5.3 Proceso de Actualización

#### Actualización de Modismos:

**Frecuencia:** Semanal/Mensual

**Proceso:**
1. Lingüista/Comunidad propone nuevos modismos
2. Validación por equipo de contenido
3. Agregar entradas a `modismos.txt`
4. Commit a repositorio Git
5. Deploy automático (CI/CD)
6. Backend recarga automáticamente en hot-reload
7. Usuarios ven nuevos modismos sin actualizar app

**Sin downtime:** ✅

#### Actualización de Código:

**Frecuencia:** Según necesidad

**Proceso:**
1. Desarrollo en rama feature
2. Pull request y code review
3. Merge a rama main
4. CI/CD ejecuta:
   - Tests automatizados
   - Build de producción
   - Deploy a staging
   - Tests de integración
   - Deploy a producción
5. Rollback disponible en caso de errores

**Downtime máximo:** < 1 minuto

### 5.4 Monitoreo y Mantenimiento

**Métricas en Tiempo Real:**
- Uptime del servidor (objetivo: 99.5%)
- Tiempo de respuesta de API (objetivo: < 500ms)
- Tasa de error (objetivo: < 0.1%)
- Usuarios activos concurrentes

**Logs:**
- Backend: Winston/Morgan logs
- Frontend: Error tracking (Sentry)
- Base de datos: Query logs

**Backups:**
- Base de datos MySQL: Diario, retención 30 días
- Código fuente: Git + repositorio remoto
- Archivo modismos: Versionado en Git

**Soporte:**
- Email de soporte
- Sección FAQ en plataforma
- Comunidad Discord/Telegram (opcional)

### 5.5 Escalabilidad

**Crecimiento Esperado:**

| Métrica | Inicial | 6 meses | 1 año |
|---------|---------|---------|-------|
| Usuarios únicos/mes | 100 | 5,000 | 20,000 |
| Traducciones/día | 500 | 25,000 | 100,000 |
| Modismos en BD | 639 | 1,500 | 3,000 |
| Países soportados | 10 | 15 | 20 |

**Plan de Escalado:**
1. **Fase 1 (0-1000 usuarios):**
   - Servidor único
   - Base de datos standalone
   - Sin cache

2. **Fase 2 (1000-10000 usuarios):**
   - Load balancer
   - Redis cache
   - CDN para assets

3. **Fase 3 (10000+ usuarios):**
   - Múltiples servidores backend
   - Base de datos con réplicas
   - Microservicios (traducción, usuarios, diccionario)

---

## 6. INDICADORES DE CALIDAD DEL SERVICIO

### 6.1 Indicadores Técnicos

| Indicador | Meta | Medición |
|-----------|------|----------|
| Tiempo de carga inicial | < 3 seg | Lighthouse |
| Tiempo de traducción | < 500 ms | API logs |
| Disponibilidad | 99.5% | Uptime monitor |
| Tasa de error | < 0.1% | Error logs |
| Precisión de traducción | > 90% | User feedback |
| Compatibilidad navegadores | 95%+ usuarios | Analytics |

### 6.2 Indicadores de Experiencia de Usuario

| Indicador | Meta | Medición |
|-----------|------|----------|
| Satisfacción del usuario | > 4.5/5 | Encuestas |
| Retención a 30 días | > 40% | Analytics |
| Traducciones por sesión | > 5 | Métricas de uso |
| Tasa de conversión (diccionario) | > 30% | Analytics |
| Uso de reconocimiento de voz | > 20% | Feature usage |

### 6.3 Indicadores de Contenido

| Indicador | Meta | Medición |
|-----------|------|----------|
| Modismos totales | Crecimiento +50/mes | Conteo de BD |
| Cobertura por país | > 50 modismos/país | Análisis de BD |
| Contribuciones comunidad | > 10/mes | Submissions |
| Precisión lingüística | > 95% | Validación experta |

---

## 7. COSTOS OPERACIONALES ESTIMADOS

### 7.1 Costos de Infraestructura (Mensual)

**Opción Económica (0-1000 usuarios):**
- VPS básico: $10-20 USD
- Base de datos MySQL: $0 (incluido en VPS)
- Dominio: $1-2 USD/mes
- SSL: $0 (Let's Encrypt gratis)
- **Total: ~$15-25 USD/mes**

**Opción Escalable (1000-10000 usuarios):**
- VPS avanzado: $40-60 USD
- Base de datos gestionada: $15-25 USD
- CDN: $10-20 USD
- Redis cache: $10 USD
- **Total: ~$75-115 USD/mes**

### 7.2 Costos de Desarrollo (Inicial)

- Desarrollo (4 semanas × 4 personas × $25/hora × 40 horas): $16,000 USD
- Diseño UI/UX: $2,000 USD
- QA y Testing: $1,500 USD
- Investigación lingüística: $1,500 USD
- **Total Inicial: ~$21,000 USD**

### 7.3 Costos de Mantenimiento (Mensual)

- Desarrollador part-time (20h/semana): $2,000 USD
- Lingüista/Moderador: $500 USD
- Infraestructura: $75-115 USD
- **Total Mensual: ~$2,575-2,615 USD**

---

## 8. RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Baja adopción de usuarios | Media | Alto | Marketing en redes, SEO, partnerships con escuelas de idiomas |
| Errores en traducción de modismos | Alta | Medio | Validación por nativos, sistema de reportes de usuarios |
| Incompatibilidad de navegadores | Baja | Alto | Progressive enhancement, fallbacks para voz |
| Saturación de servidor | Media | Alto | Auto-scaling, CDN, cache |
| Problemas de privacidad | Baja | Crítico | Compliance GDPR, encriptación, política de privacidad clara |
| Abandono del proyecto | Baja | Crítico | Documentación exhaustiva, código open-source |

---

## 9. PLAN DE CONTINUIDAD

**Backups:**
- Base de datos: Backup diario automático, retención 30 días
- Código: Git + GitHub/GitLab
- Configuración: Documentada en repositorio

**Recuperación ante Desastres:**
- RTO (Recovery Time Objective): 4 horas
- RPO (Recovery Point Objective): 24 horas
- Procedimiento documentado de restauración

**Transferencia de Conocimiento:**
- Documentación técnica completa
- README detallados en cada módulo
- Comentarios en código crítico
- Diagramas de arquitectura

---

## 10. ROADMAP DE EVOLUCIÓN

### Corto Plazo (3 meses)
- [ ] Agregar 500+ modismos adicionales
- [ ] Implementar sistema de contribución comunitaria
- [ ] App móvil nativa (React Native)
- [ ] Modo offline básico

### Mediano Plazo (6-12 meses)
- [ ] IA para sugerencias contextuales
- [ ] Integración con redes sociales
- [ ] Gamificación (puntos, badges)
- [ ] API pública para developers
- [ ] Expandir a 20 países

### Largo Plazo (1-2 años)
- [ ] Traducción en tiempo real con IA
- [ ] Detección automática de idioma/país
- [ ] Integración con asistentes virtuales (Alexa, Google Assistant)
- [ ] Versión empresarial para call centers
- [ ] Expansión a otros idiomas (portugués brasileño, inglés regional)

---

**Documento generado:** 30 de noviembre, 2025  
**Versión del producto:** 1.0.0  
**Estado:** Producción  
**Última actualización de modismos:** 30/11/2025 (639 entradas)
