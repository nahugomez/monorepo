# Guía de Contribución al Proyecto “Monorepositorio”

Este documento describe el flujo y las convenciones que seguimos para mantener la calidad y coherencia en el código.

## Flujo de Trabajo con Git

Usamos **GitHub Flow**, con ramas nombradas de la siguiente forma:

- `feature/<descripción>`
- `bugfix/<descripción>`
- `hotfix/<descripción>`

Pasos básicos:

1. Crea tu rama a partir de `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/mi-nueva-funcionalidad
   ```

2. Realiza tus cambios en la rama y haz commits claros. Por defecto, los commits van a empezar con letra mayuscula, y con un verbo imperativo.

3. Empuja tu rama al remoto:

   ```bash
   git push origin feature/mi-nueva-funcionalidad
   ```

4. Abre un Pull Request (PR) contra `main` usando la plantilla definida.

## Estilo de Código

Usamos ESLint para validar calidad y estilo.

## Hooks de Git

Husky se encarga de ejecutar hooks automáticos:

- **pre-commit**: Corre ESLint en los archivos modificados.
- **commit-msg**: Validacion de mensaje de Commit

---

## Pull Requests

Para abrir un PR, utiliza la plantilla situada en `.github/PULL_REQUEST_TEMPLATE.md`.

### Proceso de revisión

1. El PR debe incluir una descripción clara de los cambios.
2. Se requiere la aprobación de **Nahuel** antes de hacer merge.

#### Checklist mínimo

- [ ] La descripción explica **qué** y **por qué** cambias.
- [ ] No hay errores de ESLint.
- [ ] No se rompen flujos existentes.
- [ ] Se agrega documentación si aplica.

## Futuras Integraciones de Tests y CI/CD

Aunque todavía no está configurado, pronto será **obligatorio**:

- Agregar tests unitarios y de integración.
- Integrar CI/CD que bloquee merges si fallan los tests.

Mantengamos el código testeable desde ahora, creando pequeñas unidades lógicas y separando responsabilidades.

## Comunicación y Soporte

- Las discusiones de colaboración y dudas se hacen en el **grupo de WhatsApp**.
- Para consultas puntuales o bloqueos, envía mensaje privado a **Nahuel**.

## Contacto

Si tienes dudas sobre este proceso, abre un PR comentando aquí o escribe directamente a Nahuel.
