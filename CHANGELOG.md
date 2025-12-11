# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-12-11

### Changed
- fix: eliminar referencias a onMenuClick en tests y stories
- docs: actualizar CHANGELOG y versión a v1.0.0
- docs: actualizar CHANGELOG y versión a v1.0.0
- chore: bump version to 1.0.0
- style: añadir estilos para breadcrumb móvil sutil
- refactor: eliminar menú hamburguesa y añadir breadcrumb móvil
- feat: añadir controles de cantidad y botón de pago mockeado al carrito
- feat: añadir sistema de cantidades al carrito e iconos plus/minus
- feat: añadir sistema de cantidades al carrito con incremento/decremento
- style: simplificar estilos de Toast y mejorar colores
- style: usar variable CSS para color de texto inverso en detalle de producto
- style: mejorar componentes UI con variables CSS y mejor contraste
- style: mejorar apariencia de tarjetas de producto
- style: usar variables CSS en estilos base de la aplicación
- docs: actualizar README con información del proyecto MobileStore
- style: mejorar estilos del dropdown del carrito con variables CSS
- fix: cambiar símbolo de moneda de dólar a euro en el total del carrito
- fix: forzar instalación limpia eliminando package-lock.json en build
- fix: regenerar package-lock.json para compatibilidad con Linux
- fix: limpiar node_modules antes de instalar en Netlify
- fix: usar npm install en lugar de npm ci para Netlify
- fix: usar npm ci para resolver problema de rollup en Netlify
- fix: especificar rama main para deploy en Netlify
- chore: añadir configuración de Netlify para autodeploy
- chore: actualizar tsconfig.tsbuildinfo
- fix(ui): cambiar formato de precio de $ a €
- feat(cart): añadir confirmación al vaciar carrito
- feat(cart): implementar expiración automática del carrito a 1 hora
- test: update tests to include required providers
- feat(product-detail): integrate cart add functionality
- feat(app): integrate Toast notifications for cart session reset
- feat(icons): add toast notification icons to sprite
- feat(ui): add Toast notification component
- feat(header): add cart dropdown with item management
- feat(cart): enhance cart context with items management and notifications
- feat(api): add caching system with 1-hour expiration
- feat(products): add missing specs (os, dimensions, weight)
- feat(header): add breadcrumb navigation and improve header
- feat(ui): add PaginatedGrid component and integrate in Home
- feat(cart): implement add to cart functionality
- feat: integrate API with full product details and fix tests
- feat: update Button component with icon prop, refactor usages, and polish NotFound page styling
- refactor(pages): restructure ProductDetail with feature-based architecture
- refactor(pages): restructure Home with feature-based architecture
- feat(pages): add Home and ProductDetail pages
- feat(components): add ProductCard component
- fix(config): resolve Vite/Vitest version conflict
- fix(css): add PostCSS nested plugin for CSS nesting support
- feat(styles): add design tokens for mobile store
- feat(ui): complete UI component library with Image and Carousel improvements
- feat(storybook): add stories for all UI components
- feat(ui): add reusable UI components with SVG sprite icons
- fix: corregir workflow CHANGELOG y restaurar v0.1.0
- docs: actualizar CHANGELOG y versión a v0.1.1

## [0.1.1] - 2025-12-11

### Changed
- ci: auto-actualizar CHANGELOG y package.json en releases
- docs: release v0.1.0

## [0.1.0] - 2025-12-11

### Added
- Configuración inicial del proyecto React + TypeScript + Vite
- Componente App base con estilos
- Routing SPA con React Router (Home, About, 404)
- Tests con Vitest y React Testing Library
- ESLint configurado para TypeScript
- Path aliases (@/, @components/, @utils/, etc.)
- GitHub Actions para releases automáticos
- Sprite SVG para iconos
- Script Base64 para generación de tokens
- README y documentación

---

## Formato de commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato (no afecta código)
refactor: refactorización
test: añadir o modificar tests
chore: tareas de mantenimiento
ci: cambios en CI/CD
```
