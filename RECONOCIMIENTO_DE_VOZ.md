# 🎤 Reconocimiento de Voz - Cachai'Po

## ✅ Funcionalidad Implementada

El sistema de reconocimiento de voz ahora está **completamente funcional** y utiliza la **Web Speech API** nativa del navegador.

## 🌟 Características

### 1. **Captura de Voz en Tiempo Real**
- El sistema captura automáticamente lo que dices mientras grabas
- Muestra el texto capturado en tiempo real durante la grabación
- Distingue entre texto confirmado (negro) y texto provisional (gris cursiva)

### 2. **Traducción Automática**
- Al detener la grabación, el texto capturado se traduce automáticamente
- Utiliza los 639 modismos latinoamericanos en la base de datos
- Soporta traducciones entre 10 países diferentes

### 3. **Soporte Multi-Idioma**
- **Chile**: `es-CL`
- **México**: `es-MX`
- **Argentina**: `es-AR`
- **España**: `es-ES`
- Automáticamente selecciona el idioma según el país de origen

### 4. **Interfaz Visual**
- **Cronómetro**: Muestra el tiempo de grabación
- **Animación de ondas**: Indicador visual de grabación activa
- **Tarjeta de texto**: Muestra el texto capturado en tiempo real
- **Botón de detener**: Rojo con icono de cuadrado/pausa

## 🚀 Cómo Usar

### Paso 1: Activar Modo Voz
1. Abre la aplicación en tu navegador
2. Asegúrate de estar en "Modo Voz" (pantalla principal)
3. Selecciona tu país de origen y país destino

### Paso 2: Iniciar Grabación
1. Toca el **botón de micrófono** (rojo grande)
2. Tu navegador pedirá permiso para acceder al micrófono
3. **¡IMPORTANTE!** Debes **permitir el acceso al micrófono**

### Paso 3: Hablar
1. Habla claramente cerca del micrófono
2. Verás el texto aparecer en la pantalla en tiempo real
3. El cronómetro muestra cuánto tiempo llevas grabando
4. Las ondas animadas indican que está capturando audio

### Paso 4: Detener y Traducir
1. Toca el **botón rojo** para detener la grabación
2. El sistema procesará el texto capturado
3. Se mostrará la traducción automáticamente

## 🔧 Requisitos Técnicos

### Navegadores Compatibles ✅
- **Google Chrome** (recomendado)
- **Microsoft Edge**
- **Safari** (macOS/iOS)
- **Opera**

### Navegadores NO Compatibles ❌
- **Firefox** (soporte limitado)
- Navegadores antiguos

### Permisos Necesarios
- **Acceso al micrófono**: El navegador pedirá permiso la primera vez
- **HTTPS**: En producción, la app debe estar en HTTPS (en desarrollo funciona con localhost)

## 🎯 Ejemplos de Uso

### Ejemplo 1: Chile → México
1. Selecciona **Chile** como origen
2. Selecciona **México** como destino
3. Graba: *"Oye weon, vamos al carrete esta noche"*
4. Resultado: *"Oye güey, vamos a la fiesta esta noche"*

### Ejemplo 2: Argentina → España
1. Selecciona **Argentina** como origen
2. Selecciona **España** como destino
3. Graba: *"Che boludo, vamos a morfar algo"*
4. Resultado: *"Tío tronco, vamos a comer algo"*

### Ejemplo 3: México → Chile
1. Selecciona **México** como origen
2. Selecciona **Chile** como destino
3. Graba: *"Qué onda güey, está bien chido esto"*
4. Resultado: *"Qué onda weon, está bien bacán esto"*

## 🐛 Solución de Problemas

### El micrófono no funciona
**Problema**: El navegador no detecta voz
**Solución**:
1. Verifica que hayas **permitido el acceso al micrófono**
2. Revisa la configuración de permisos del navegador
3. Asegúrate de usar un navegador compatible (Chrome/Edge)
4. Verifica que tu micrófono esté funcionando correctamente

### No se captura texto
**Problema**: Hablas pero no aparece texto
**Solución**:
1. Habla más **cerca del micrófono**
2. Habla más **claramente y despacio**
3. Verifica el volumen del micrófono en tu sistema
4. Intenta en un lugar más **silencioso**

### Error "No soportado"
**Problema**: Mensaje de que el reconocimiento de voz no está soportado
**Solución**:
1. Usa **Google Chrome** o **Microsoft Edge**
2. Actualiza tu navegador a la versión más reciente
3. Asegúrate de estar usando **HTTPS** en producción

### La traducción no es correcta
**Problema**: El texto se captura pero la traducción es extraña
**Solución**:
1. Habla utilizando **modismos comunes** del país seleccionado
2. Revisa que hayas seleccionado el **país de origen correcto**
3. Consulta `EJEMPLOS_MODISMOS.md` para ver frases de ejemplo

## 📱 Modo Tiempo Real (Opcional)

### Activar Modo Tiempo Real
1. Ve a **Configuración** (⚙️)
2. Activa el interruptor **"Traducción en Tiempo Real"**
3. Regresa a Modo Voz
4. Ahora verás un indicador **"⚡ Tiempo Real"**

### Diferencias
- **Normal**: Traduce cuando detienes la grabación
- **Tiempo Real**: Traduce mientras hablas (experimental)

## 🔒 Privacidad

- El reconocimiento de voz se procesa **en tu navegador**
- No se envía audio a servidores externos
- Solo se envía el **texto transcrito** a la API para traducción
- El texto capturado no se guarda automáticamente (solo si lo agregas al diccionario)

## 📊 Tecnologías Utilizadas

- **Web Speech API**: API nativa del navegador para reconocimiento de voz
- **React Hooks**: `useSpeechRecognition` hook personalizado
- **TypeScript**: Tipado fuerte para mejor desarrollo
- **API REST**: Backend NestJS para traducción de modismos

## 🎨 Componentes Clave

### `useSpeechRecognition` Hook
```typescript
const {
  isListening,      // ¿Está grabando?
  transcript,       // Texto confirmado
  interimTranscript, // Texto provisional
  isSupported,      // ¿Soportado por el navegador?
  startListening,   // Iniciar grabación
  stopListening,    // Detener grabación
  resetTranscript,  // Limpiar texto
} = useSpeechRecognition({ lang: 'es-CL' });
```

### `VoiceRecording` Componente
- Muestra cronómetro de grabación
- Animación de ondas de audio
- Tarjeta con texto capturado en tiempo real
- Botón de detener grabación

## 📝 Notas Importantes

1. **Primera vez**: El navegador pedirá permiso para acceder al micrófono. Debes aceptar.
2. **Navegador recomendado**: Google Chrome o Microsoft Edge
3. **Micrófono**: Asegúrate de tener un micrófono funcionando
4. **Idioma**: El sistema detecta automáticamente el idioma según el país seleccionado
5. **Precisión**: Habla claramente para mejor precisión en la transcripción

## 🚀 Próximas Mejoras

- [ ] Soporte para más variantes de español
- [ ] Detección automática del idioma hablado
- [ ] Modo offline con speech-to-text local
- [ ] Traducción simultánea durante la grabación
- [ ] Historial de grabaciones
- [ ] Exportar audio capturado

---

**¡Ahora puedes hablar y ver cómo tus modismos se traducen automáticamente!** 🎉
