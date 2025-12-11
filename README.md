# Front-End Test

Proyecto React + TypeScript con Vite.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar build |
| `npm run lint` | Verificar código con ESLint |
| `npm run test` | Tests en modo watch |
| `npm run test:run` | Ejecutar tests una vez |

## Estructura

```
src/
├── pages/          # Vistas (Home, About, 404)
├── utils/          # Funciones utilitarias
├── test/           # Configuración de tests
└── App.tsx         # Router principal
```

## Path Aliases

```typescript
import { helper } from '@/utils/helpers'
import Component from '@components/MyComponent'
```

| Alias | Ruta |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@utils/*` | `src/utils/*` |
| `@hooks/*` | `src/hooks/*` |
| `@types/*` | `src/types/*` |

## Scripts de utilidad

### Base64 (PowerShell)

Script para codificar/decodificar Base64, útil para generar tokens.

```powershell
# Codificar texto a Base64
.\scripts\base64.ps1 -Mode encode -InputText "mi-token-secreto"

# Decodificar Base64 a texto
.\scripts\base64.ps1 -Mode decode -InputText "bWktdG9rZW4tc2VjcmV0bw=="
```

## Iconos SVG (Sprite)

Los iconos se gestionan mediante un sprite SVG ubicado en `public/sprite.svg`.

### Añadir un icono

1. Añadir el símbolo en `public/sprite.svg`:

```svg
<symbol id="icon-nombre" viewBox="0 0 24 24">
  <path d="..." />
</symbol>
```

2. Usar en componentes:

```tsx
<svg className="icon">
  <use href="/sprite.svg#icon-nombre" />
</svg>
```

### Estilos para iconos

```css
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

## Releases

Para crear una release, usar tags de Git:

```bash
git tag v1.0.0
git push --tags
```

El workflow de GitHub Actions creará automáticamente el release con notas de los commits.
