# Monorepositorio con Turborepo para aplicaciones con Next.js

Este es un monorepositorio para aplicaciones con Next.js y paquetes de utilidades. Es una prueba de concepto para ver si es viable usar monorepo para proyectos de Next.js. En especifico, se va a probar que es una opción viable para el desarrollo de portales web que comparten mismos componentes de interfaz de usuario.

## Estructura del repositorio

```
monorepo/
├── apps/               # Aplicaciones Next.js
├── packages/           # Paquetes compartidos
├── package.json        # Configuración principal
├── pnpm-workspace.yaml # Configuración de workspaces
└── turbo.json          # Configuración de Turborepo
```

## Configuraciones del repositorio

### Turborepo

Es un sistema de compilación inteligente optimizado para monorepos (repositorios con múltiples proyectos) de JavaScript y TypeScript, que acelera drásticamente tareas como build, test y lint mediante el almacenamiento en caché de los resultados y la ejecución paralela de operaciones, reduciendo así los tiempos de espera en desarrollo y CI/CD.

El archivo de configuracion es `turbo.json`. Tiene las siguientes configuraciones:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

El corazón de Turborepo, dentro de la configuracion, es la propiedad `tasks` define las diferentes tareas que Turborepo puede ejecutar y cómo debe manejarlas. Cada clave dentro de tasks es el nombre de una tarea (que generalmente coincide con un script en el package.json de cada paquete dentro del monorepo).

Podemos encontrar mas informacion y ver todas las personalizaciones de configuracion en [la documentacion de Turborepo](https://turbo.build/docs/reference/configuration).
