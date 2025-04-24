# =========================================================
# Etapa base: Configura un entorno ligero con Node.js 18 
# sobre Alpine, incluyendo Corepack y pnpm
# =========================================================
FROM node:18-alpine AS base

# 1. Actualiza el índice de paquetes de Alpine para asegurar que se instalen las versiones más recientes disponibles.
# 2. Instala `libc6-compat` para garantizar compatibilidad con bibliotecas que dependen de glibc, común en entornos Alpine.
# 3. Instala `bash` un shell compatible que pnpm setup puede reconocer
# 3. Habilita Corepack, una herramienta incluida en Node.js para gestionar versiones de gestores de paquetes como pnpm.
# 4. Prepara y activa la última versión de pnpm, asegurando que esté lista para usarse en el contenedor.
# 5. Ejecuta `pnpm setup` para configurar pnpm globalmente, creando los directorios necesarios en el sistema.
RUN apk update && \
    apk add --no-cache libc6-compat bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    SHELL=/bin/bash pnpm setup

# Define el directorio de trabajo como /app, usado en todas las etapas posteriores para mantener consistencia.
WORKDIR /app

# =========================================================
# Etapa builder: Instala Turbo CLI y genera un subconjunto 
# optimizado del monorepo
# =========================================================
FROM base AS builder

# Establecer PNPM_HOME y agregar al PATH
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Crear el directorio si no existe
RUN mkdir -p /root/.pnpm

# Instala Turbo CLI globalmente con una versión mayor específica (reemplaza <your-major-version> por ej. 2).
# Turbo CLI es una herramienta para gestionar builds y tareas en monorepos, optimizando el proceso.
RUN pnpm add -g turbo@^2

# Copia todo el código fuente del monorepo al contenedor, incluyendo todos los workspaces y configuraciones.
COPY . .

# Usa Turbo para generar un subconjunto optimizado del monorepo, enfocado en el workspace "ssrweb".
# El flag --docker asegura que solo se incluyan los archivos necesarios para el build, reduciendo el tamaño.
RUN turbo prune @monorepo/ssrweb --docker

# =========================================================
# Etapa installer: Instala dependencias y compila el 
# proyecto para producción
# =========================================================
FROM base AS installer

# Establecer PNPM_HOME y agregar al PATH
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Crear el directorio si no existe
RUN mkdir -p /root/.pnpm

# Establece el directorio de trabajo en /app, manteniendo consistencia con las etapas previas.
WORKDIR /app

# 1. Copia únicamente los archivos package.json y pnpm-lock.yaml generados por turbo prune desde la etapa builder.
#    Esto permite instalar dependencias sin necesidad de copiar todo el código fuente inicialmente.
COPY --from=builder /app/out/json/ ./

# 2. Instala las dependencias exactas definidas en pnpm-lock.yaml.
#    El flag --frozen-lockfile asegura que no se modifique el lockfile, garantizando builds reproducibles.
RUN pnpm install --frozen-lockfile

# 3. Copia el resto de los archivos necesarios para la compilación desde la etapa builder.
#    Incluye el código fuente y otros archivos específicos del workspace "ssrweb".
COPY --from=builder /app/out/full/ ./

# 4. Instalar Turbo de manera global
RUN pnpm add -g turbo@^2

# 5. Ejecuta el comando "build" definido en turbo.json para compilar el proyecto.
#    Turbo coordina las dependencias entre paquetes y ejecuta los builds en el orden adecuado.
RUN turbo run build

# =========================================================
# Etapa runner: Configura un entorno mínimo para ejecutar 
# Next.js en producción
# =========================================================
FROM base AS runner

# Establece el directorio de trabajo en /app para la etapa final.
WORKDIR /app

# 1. Crea un grupo (nodejs) y un usuario (nextjs) sin privilegios, con IDs específicos (1001).
#    Esto mejora la seguridad al evitar que la aplicación se ejecute como root.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Cambia al usuario nextjs para ejecutar los siguientes comandos y la aplicación, aplicando el principio de menor privilegio.
USER nextjs

# 2. Copia la salida standalone de Next.js generada en la etapa installer, propiedad de nextjs:nodejs.
#    Incluye el servidor y los archivos mínimos necesarios para ejecutar la aplicación.
#    También copia los assets estáticos y públicos del workspace "ssrweb", optimizados por Output File Tracing.
COPY --from=installer --chown=nextjs:nodejs /app/apps/ssrweb/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/ssrweb/.next/static ./apps/ssrweb/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/ssrweb/public     ./apps/ssrweb/public

# 3. Define el comando para iniciar el servidor de Next.js en producción.
#    Ejecuta el archivo server.js generado por Next.js, sirviendo la aplicación de manera eficiente.
CMD ["node", "apps/ssrweb/server.js"]