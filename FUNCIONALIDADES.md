# Funcionalidades de Cachai'Po - Frontend Conectado al Backend

## 🌍 Traducción Intercultural en Tiempo Real

### 1. **Modo Voz**
**Frontend:** `VoiceMode.tsx`, `VoiceRecording.tsx`
**Backend:** `POST /translations/translate`
**Flujo:**
```typescript
Usuario presiona micrófono
  → Captura audio (simulado)
  → Convierte a texto
  → api.translate(originCode, destCode, text)
  → Backend busca traducción en base de datos
  → Retorna traducción + equivalencias
  → Muestra resultado en pantalla
```

**Funcionalidad:**
- Permite al usuario hablar en su idioma local
- Traduce automáticamente a la jerga del país de destino
- Muestra equivalencias palabra por palabra
- Guarda historial de traducciones en MySQL

### 2. **Modo Texto**
**Frontend:** `TextMode.tsx`
**Backend:** `POST /translations/translate`
**Flujo:**
```typescript
Usuario escribe texto
  → handleTranslate(text)
  → api.translate(originCode, destCode, text)
  → Backend procesa y traduce
  → Retorna traducción con equivalencias
  → Muestra en Results.tsx
```

**Funcionalidad:**
- Input de texto manual
- Traducción instantánea al seleccionar país destino
- Swap rápido entre países (origen ↔ destino)
- Visualización de equivalencias lingüísticas

### 3. **Selección de Países**
**Frontend:** `CountrySelector.tsx`
**Backend:** `GET /countries`
**Flujo:**
```typescript
App inicia
  → useEffect(() => api.getCountries())
  → Carga 8 países desde MySQL
  → Guarda en estado local
  → Muestra en selector con banderas
```

**Países Disponibles:**
- 🇨🇱 Chile
- 🇲🇽 México
- 🇦🇷 Argentina
- 🇨🇴 Colombia
- 🇻🇪 Venezuela
- 🇪🇸 España
- 🇵🇪 Perú
- 🇺🇾 Uruguay

## 📚 Diccionario Personal

### 4. **Guardar Palabras**
**Frontend:** `Results.tsx` → Botón "Guardar en diccionario"
**Backend:** `POST /dictionary`
**Flujo:**
```typescript
Usuario ve traducción
  → Presiona "Guardar"
  → api.addToDictionary({
      userId,
      word,
      translation,
      originCountry,
      destinationCountry
    })
  → Guarda en tabla dictionary_entries
  → Actualiza lista local
```

**Funcionalidad:**
- Almacena palabras importantes para el usuario
- Asocia cada palabra con su contexto (países origen/destino)
- Sincroniza con backend automáticamente
- Identificación por userId único

### 5. **Ver Diccionario**
**Frontend:** `Dictionary.tsx`
**Backend:** `GET /dictionary/user/:userId`
**Flujo:**
```typescript
Usuario navega a diccionario
  → useEffect(() => api.getDictionary(userId))
  → Backend busca entradas del usuario
  → Retorna lista ordenada por fecha
  → Renderiza tarjetas con palabra + traducción
```

### 6. **Eliminar Palabras**
**Frontend:** `Dictionary.tsx` → Botón eliminar
**Backend:** `DELETE /dictionary/:id`
**Flujo:**
```typescript
Usuario presiona eliminar
  → api.deleteFromDictionary(entryId)
  → Backend elimina de MySQL
  → Actualiza lista local
  → Muestra toast de confirmación
```

## ⚙️ Configuración de Usuario

### 7. **Perfil y Preferencias**
**Frontend:** `Settings.tsx`
**Backend:** `POST /user-settings`
**Flujo:**
```typescript
Usuario modifica settings
  → handleUpdateSettings(newSettings)
  → api.saveUserSettings({
      userId,
      name,
      originCountry,
      email,
      realtimeTranslation,
      readingSpeed,
      darkMode,
      language
    })
  → Backend guarda en user_settings
  → Actualiza configuración global
```

**Configuraciones Disponibles:**
- **Nombre de usuario**
- **País de origen** (afecta traducciones predeterminadas)
- **Email** (opcional)
- **Traducción en tiempo real** (switch)
- **Velocidad de lectura** (lento, normal, rápido)
- **Modo oscuro** (toggle)
- **Idioma de interfaz** (ES/EN)

### 8. **Persistencia de Datos**
**Frontend:** localStorage + estado React
**Backend:** MySQL + Prisma
**Flujo:**
```typescript
// Al iniciar la app
useEffect(() => {
  const userId = localStorage.getItem("userId") || generateId();
  loadUserSettings(userId);
  loadDictionary(userId);
  loadCountries();
}, []);

// Auto-guardado
useEffect(() => {
  if (userSettings) {
    saveToBackend(userSettings);
  }
}, [userSettings]);
```

## 🔄 Sistema de Traducción

### 9. **Motor de Traducción**
**Backend:** `translations.service.ts`
```typescript
class TranslationsService {
  // Base de datos de traducciones locales
  private translationData = {
    'CL-MX': {
      'Está piola el carrete': {
        text: 'Está chida la fiesta',
        equivalences: { piola: 'chida', carrete: 'fiesta' }
      },
      // ... más traducciones
    }
  };

  async translate(dto) {
    const key = `${dto.originCountryCode}-${dto.destinationCountryCode}`;
    const translation = this.translationData[key]?.[dto.text];
    
    if (translation) {
      // Guardar en historial
      await prisma.translation.create({...});
      return translation;
    }
    
    return fallback;
  }
}
```

### 10. **Historial de Traducciones**
**Backend:** `GET /translations`
```typescript
// Obtener todas las traducciones (para estadísticas)
async findAll() {
  return prisma.translation.findMany({
    orderBy: { createdAt: 'desc' }
  });
}
```

## 📱 Experiencia Móvil

### Características Mobile-First:
1. **Diseño Responsivo** - Tailwind CSS optimizado
2. **Touch Friendly** - Botones grandes y táctiles
3. **Navegación Inferior** - BottomNav para fácil acceso
4. **Gestos** - Swap countries con animación
5. **Loading States** - Feedback visual en operaciones async
6. **Toast Notifications** - Mensajes de éxito/error

## 🚀 Flujo Completo de Usuario

```
1. ONBOARDING
   ↓
2. SELECCIONA PAÍS DE ORIGEN (Chile 🇨🇱)
   ↓
3. PANTALLA PRINCIPAL - Modo Voz
   ↓
4. PRESIONA MICRÓFONO
   ↓
5. HABLA: "Está piola el carrete"
   ↓
6. SISTEMA TRADUCE → México 🇲🇽: "Está chida la fiesta"
   ↓
7. MUESTRA EQUIVALENCIAS: piola = chida, carrete = fiesta
   ↓
8. USUARIO GUARDA EN DICCIONARIO
   ↓
9. BACKEND PERSISTE EN MySQL
   ↓
10. DISPONIBLE EN CUALQUIER DISPOSITIVO
```

## 🎯 Casos de Uso Reales

### Caso 1: Estudiante de Intercambio
```
Usuario: Estudiante chileno en México
Situación: Escucha "No manches güey"
Acción: 
  1. Abre app
  2. Selecciona MX → CL
  3. Escribe/habla la frase
  4. Ve traducción: "No puede ser compadre"
  5. Guarda en diccionario para referencia
```

### Caso 2: Turista
```
Usuario: Mexicano visitando Argentina
Situación: Quiere decir "Está chido"
Acción:
  1. Abre app
  2. MX → AR
  3. Escribe "Está chido"
  4. Ve: "Está copado"
  5. Usa en conversación real
```

### Caso 3: Migrante
```
Usuario: Venezolano en Chile
Situación: No entiende expresiones locales
Acción:
  1. Configura VE como origen
  2. CL como destino
  3. Traduce frases durante el día
  4. Construye diccionario personalizado
  5. Mejora integración social
```

## 💾 Estructura de Datos

### Translation (MySQL)
```prisma
model Translation {
  id                      String   @id @default(uuid())
  originCountryCode       String
  destinationCountryCode  String
  originalText            String
  translatedText          String
  equivalences            Json     // { "piola": "chida" }
  createdAt               DateTime
}
```

### DictionaryEntry (MySQL)
```prisma
model DictionaryEntry {
  id                String   @id @default(uuid())
  userId            String
  word              String
  translation       String
  originCountry     Country
  destinationCountry Country
  createdAt         DateTime
}
```

### UserSettings (MySQL)
```prisma
model UserSettings {
  id                  String   @id @default(uuid())
  userId              String   @unique
  name                String?
  originCountry       Country
  email               String?
  realtimeTranslation Boolean
  readingSpeed        String
  darkMode            Boolean
  language            String
  updatedAt           DateTime
}
```

## ✅ Funcionalidades Implementadas

- ✅ Traducción voz/texto entre jergas
- ✅ Selección dinámica de países
- ✅ Diccionario personal persistente
- ✅ Configuración de usuario guardada
- ✅ Historial de traducciones
- ✅ Equivalencias palabra por palabra
- ✅ UI móvil responsiva
- ✅ Notificaciones toast
- ✅ Loading states
- ✅ Manejo de errores
- ✅ Persistencia en MySQL
- ✅ API REST completa
- ✅ TypeScript end-to-end
