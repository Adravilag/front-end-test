# MobileStore - Front-End Test

Tienda de dispositivos móviles desarrollada con React + TypeScript + Vite.

## 🚀 Demo

[https://mobile-store-demo.netlify.app](https://mobile-store-demo.netlify.app)

## Requisitos

- Node.js 18+ (recomendado 20)
- npm 9+

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/Adravilag/front-end-test.git
cd front-end-test

# Instalar dependencias
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
| `npm run storybook` | Abrir Storybook (documentación de componentes) |

## Características

- 🛒 Carrito de compras con persistencia en localStorage
- ⏱️ Expiración automática del carrito (1 hora)
- 🔍 Búsqueda y filtrado de productos por categoría
- 📱 Diseño responsive
- 🎨 Componentes UI reutilizables (Button, Card, Input, Toast, etc.)
- 📖 Documentación con Storybook
- ✅ Tests unitarios con Vitest

## Estructura

```
src/
├── components/     # Componentes de negocio (ProductCard)
├── context/        # Contextos React (Cart, Breadcrumb)
├── data/           # Datos mock de productos
├── hooks/          # Custom hooks
├── layouts/        # Layouts (Header)
├── pages/          # Vistas (Home, ProductDetail, NotFound)
├── services/       # Servicios API
├── styles/         # Variables CSS y estilos globales
├── ui/             # Componentes UI reutilizables
├── utils/          # Funciones utilitarias
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

## Tecnologías

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navegación
- **Vitest** - Testing
- **Storybook** - Documentación de componentes
- **ESLint** - Linting
- **Netlify** - Hosting
