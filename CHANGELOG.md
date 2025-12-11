# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

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

Ejemplos:
```bash
git commit -m "feat: añadir página de login"
git commit -m "fix: corregir validación de email"
git commit -m "docs: actualizar README"
```
