# Sistema de Traducciones Jerga-a-Jerga

## 🎯 Descripción

El sistema ahora traduce **directamente de jerga a jerga** entre diferentes países de habla hispana, en lugar de siempre pasar por un lenguaje neutral.

## 🔄 Cómo Funciona

### Antes (Sistema Antiguo)
```
Chileno → Neutral → Destino
"cachai" → "entiendes" → "entiendes"
```

### Ahora (Sistema Mejorado)
```
Chileno → Mexicano (DIRECTO)
"cachai" → "entiendes wey"

Chileno → Argentino (DIRECTO)
"hueón" → "boludo"

Mexicano → Argentino (DIRECTO)
"güey" → "boludo"
```

## 🌎 Países Soportados con Traducciones Directas

El sistema ahora incluye traducciones directas entre:

- 🇨🇱 **Chile** ↔ 🇲🇽 México
- 🇨🇱 **Chile** ↔ 🇦🇷 Argentina
- 🇨🇱 **Chile** ↔ 🇨🇴 Colombia
- 🇨🇱 **Chile** ↔ 🇪🇸 España
- 🇨🇱 **Chile** ↔ 🇵🇪 Perú
- 🇨🇱 **Chile** ↔ 🇺🇾 Uruguay
- 🇨🇱 **Chile** ↔ 🇻🇪 Venezuela
- 🇨🇱 **Chile** ↔ 🇪🇨 Ecuador
- 🇲🇽 **México** ↔ 🇦🇷 Argentina
- 🇲🇽 **México** ↔ 🇨🇴 Colombia
- 🇲🇽 **México** ↔ 🇪🇸 España
- 🇲🇽 **México** ↔ 🇵🇪 Perú
- 🇲🇽 **México** ↔ 🇻🇪 Venezuela
- 🇦🇷 **Argentina** ↔ 🇨🇴 Colombia
- 🇦🇷 **Argentina** ↔ 🇵🇪 Perú
- 🇦🇷 **Argentina** ↔ 🇺🇾 Uruguay
- 🇨🇴 **Colombia** ↔ 🇵🇪 Perú

## 📊 Estadísticas

- **Total de modismos cargados:** 883 entradas
- **Traducciones directas jerga-a-jerga:** ~300+ nuevas entradas
- **Países con datos:** 12 países hispanohablantes

## 🔍 Ejemplos de Traducciones Directas

### Chile → México
```
"¿Cachai, hueón?" → "¿Entiendes wey, güey?"
"Está bacán el carrete" → "Está chido el reventón"
"Estoy curado" → "Estoy bien pedo"
"Voy en micro" → "Voy en camión"
```

### Chile → Argentina
```
"¿Qué onda, hueón?" → "¿Qué onda boludo?"
"Está piola el carrete" → "Está piola la joda"
"Voy a buscar pega" → "Voy a buscar laburo"
"El cabro es re bacán" → "El pibe es re copado"
```

### México → Argentina
```
"¿Qué pedo, güey?" → "¿Qué onda boludo, che?"
"Está chido el reventón" → "Está copado la joda"
"Voy a buscar chamba" → "Voy a buscar laburo"
"Dame una chela" → "Dame una birra"
```

### Chile → Colombia
```
"¿Qué onda, hueón?" → "¿Quiubo, parce?"
"Está bacán" → "Está bacano"
"Voy de carrete" → "Voy de rumba"
"Dame un copete" → "Dame una pola"
```

## 💡 Lógica de Priorización

El sistema ahora sigue esta lógica:

1. **Primera prioridad:** Buscar traducción directa al país de destino
2. **Segunda prioridad:** Si no hay traducción directa, usar traducción neutral
3. **Fallback:** Si no hay ninguna traducción, mantener la palabra original

### Código de Implementación

```typescript
findTranslations(palabra: string, paisOrigen: string, paisDestino: string): Modismo[] {
  const key = `${palabra.toLowerCase()}|${paisOrigen}`;
  const all = this.modismosIndex.get(key) || [];
  
  // Priorizar traducciones directas (jerga-a-jerga) sobre neutrales
  const directas = all.filter(m => m.paisDestino === paisDestino);
  const neutrales = all.filter(m => m.paisDestino === 'NEUTRAL');
  
  // Si hay traducciones directas, usarlas primero
  return directas.length > 0 ? directas : neutrales;
}
```

## 🎨 Experiencia de Usuario

### Selección de Países

El usuario puede seleccionar:
- **País de origen:** El país cuya jerga está hablando/escribiendo
- **País de destino:** El país a cuya jerga quiere traducir

### Ejemplo de Uso

1. Usuario chileno selecciona:
   - Origen: 🇨🇱 Chile
   - Destino: 🇲🇽 México

2. Usuario escribe: "¿Cachai, hueón? Está bacán el carrete"

3. Sistema traduce: "¿Entiendes wey, güey? Está chido el reventón"

## 📝 Formato de Base de Datos

Cada entrada en `modismos.txt` sigue el formato:

```
palabra_origen|país_origen|palabra_destino|país_destino|contexto
```

### Ejemplos:

```
# Traducción directa Chile → México
cachai|CL|entiendes wey|MX|¿Entiendes, amigo?

# Traducción directa Chile → Argentina
hueón|CL|boludo|AR|Amigo

# Traducción neutral (fallback)
cachai|CL|entiendes|NEUTRAL|¿Comprendes?
```

## 🚀 Mejoras Futuras

- [ ] Agregar más variantes regionales dentro de cada país
- [ ] Incluir expresiones idiomáticas más complejas
- [ ] Agregar contexto cultural a las traducciones
- [ ] Implementar sugerencias basadas en popularidad
- [ ] Agregar traducciones bidireccionales automáticas

## 📚 Recursos

- Base de datos: `backend/data/modismos.txt`
- Servicio de carga: `backend/src/translations/modismo-loader.service.ts`
- API de traducción: `backend/src/translations/translations.service.ts`

## ✅ Estado del Sistema

- ✅ Base de datos expandida con traducciones jerga-a-jerga
- ✅ Lógica de priorización implementada
- ✅ Servidor cargando 883 modismos correctamente
- ✅ Sistema listo para pruebas y uso
