# AGENTS.md - Guía para agentes de código

## Información General del Proyecto

- **Nombre**: socket-client
- **Ubicación**: /mnt/d/proyectos/react/socket-client
- **Tipo**: Módulo ES (ESM)
- **Versión**: 0.0.0

## Comandos Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo de Vite.

### Build
```bash
npm run build
```
Ejecuta `tsc && vite build` - compila TypeScript y construye para producción.

### Preview
```npm run preview
```
Previsualiza la aplicación construida.

### Tests y Lint

**Nota**: Actualmente no hay scripts de test o lint configurados en package.json.

## Configuración de TypeScript

El proyecto usa TypeScript estricto con las siguientes opciones relevantes en `tsconfig.json`:

- `strict: true` - Verificación estricta de tipos habilitada
- `noUnusedLocals: true` - No permite variables locales sin usar
- `noUnusedParameters: true` - No permite parámetros sin usar
- `verbatimModuleSyntax: true` - Requiere importaciones explícitas con extensiones
- `erasableSyntaxOnly: true` - Solo sintaxis que puede ser borrada
- `noFallthroughCasesInSwitch: true` - Require break en todos los casos de switch
- `target: ES2023` - Target de compilación
- `module: ESNext` - Módulos ESNext

## Convenciones de Código

### Importaciones

- Usar sintaxis ESM nativa (`import`/`export`)
- Las importaciones relativas deben incluir la extensión del archivo:
  ```typescript
  import './style.css'           // Correcto
  import { something } from './module.js'  // Correcto
  ```
- Preferir importaciones con nombre sobre default cuando sea posible

### Tipado

- Tipado estricto obligatorio en todo el código
- Usar tipos explícitos en funciones y variables cuando no puedan ser inferidos
- Evitar `any` - usar `unknown` si es necesario un tipo seguro
- Usar utility types de TypeScript (Partial, Required, Pick, Omit, etc.)

### Variables y Parámetros

- No dejar variables locales sin usar
- No dejar parámetros sin usar
- Prefieren `const` sobre `let` cuando el valor no cambia
- Nombres descriptivos que revelen intención

### Nombre de Archivos

- kebab-case para archivos: `socket-manager.ts`, `connection-handler.ts`
- PascalCase para componentes/clases: `SocketManager.ts`, `ConnectionHandler.ts`
- Un archivo por defecto debe tener nombre único y descriptivo

### Funciones

- Funciones pequeñas y con responsabilidad única
- Preferir funciones de flecha para callbacks simples
- Tipos de retorno explícitos cuando no sean obvios
- Documentar funciones complejas con JSDoc si es necesario

### Errores y Excepciones

- Manejar errores de forma apropiada para el contexto
- Evitar uso excesivo de non-null assertion (`!`) - preferir verificaciones
- Usar tipos discriminados para manejo de estados de error
- Preferir contratos explícitos (throws documentados) sobre excepciones implícitas

### Organización de Archivos

```
src/
├── main.ts          # Punto de entrada
├── style.css        # Estilos globales
└── ...
```

- Código fuente en el directorio `src/`
- Punto de entrada: `main.ts`
- Los archivos deben agruparse por funcionalidad, no por tipo

## Referencias y Skills

### Vercel React Best Practices

Existe un skill de mejores prácticas de React/Next.js en:
```
.agents/skills/vercel-react-best-practices/SKILL.md
```

Este skill contiene 60+ reglas de rendimiento para React y Next.js, incluyendo:

- **Renderizado**: Optimización de componentes, memoización, useTransition
- **Servidor**: Hoisting de estáticos, cacheo, fetching paralelo
- **Bundling**: Importaciones dinámicas, barrel files, carga diferida
- **JavaScript**: Optimizaciones de iteración, cacheo de resultados
- **Cliente**: Event listeners, localStorage, SWR deduplication

**Usar este skill** cuando se trabaje con código React o Next.js.

### Estructura de Componentes (cuando se agregue React)

Si el proyecto evoluciona a React, seguir estas pautas:

1. Componentes funcionales con TypeScript
2. Props con tipos explícitos
3. useMemo/useCallback para优化的 renderizado
4. Evitar re-renders innecesarios
5. Usar useCallback para event handlers si se pasan a hijos

## Patrones Recomendados

### Manejo de Estado

```typescript
// Preferir tipos unión para estados
type LoadingState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### Validación

```typescript
// Usar guard clauses
function processData(input: unknown) {
  if (!isValidInput(input)) {
    throw new Error('Invalid input');
  }
  // procesamiento...
}
```

### Configuración

```typescript
// Objetos de configuración tipados
interface SocketConfig {
  url: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

function createSocket(config: SocketConfig) {
  // implementación...
}
```

## Notas Adicionales

- Este es un proyecto minimalista basado en Vite
- No hay configuración de ESLint o Prettier actualmente
- El proyecto está en fase inicial - considerar agregar:
  - ESLint para linting
  - Vitest o Jest para testing
  - Prettier para formateo
  - Husky para git hooks
