# =========================================================
# Etapa base: Configura un entorno ligero con Node.js 18 
# sobre Alpine, incluyendo Corepack y pnpm
# =========================================================
FROM node:18-alpine AS base

# 1. Actualiza el índice de paquetes de Alpine.
# 2. Instala `libc6-compat` para compatibilidad con glibc y `bash` para pnpm setup.
# 3. Habilita Corepack y activa la última versión de pnpm.
# 4. Configura pnpm globalmente con bash como shell.
RUN apk update && \
    apk add --no-cache libc6-compat bash && \
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    SHELL=/bin/bash pnpm setup

# Define el directorio de trabajo como /app.
WORKDIR /app

# =========================================================
# Etapa builder: Instala Turbo CLI y genera un subconjunto 
# optimizado del monorepo
# =========================================================
FROM base AS builder

# Configura PNPM_HOME y añade al PATH para usar pnpm globalmente.
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Crea el directorio de pnpm si no existe.
RUN mkdir -p /root/.pnpm

# Instala Turbo CLI globalmente (versión mayor 2).
RUN pnpm add -g turbo@^2

# Copia todo el código fuente del monorepo.
COPY . .

# Define el workspace como argumento (ajustado a SSG).
ARG WORKSPACE=@monorepo/other

# Genera un subconjunto optimizado y actualiza el lockfile.
RUN turbo prune $WORKSPACE --docker && \
    cd out/json && \
    pnpm install --lockfile-only

# =========================================================
# Etapa installer: Instala dependencias y compila el 
# proyecto para producción (archivos estáticos)
# =========================================================
FROM base AS installer

# Configura PNPM_HOME y añade al PATH.
ENV PNPM_HOME=/root/.pnpm
ENV PATH=$PNPM_HOME:$PATH

# Crea el directorio de pnpm si no existe.
RUN mkdir -p /root/.pnpm

# Define el workspace como argumento.
ARG WORKSPACE=@monorepo/other

# Copia los archivos package.json y pnpm-lock.yaml desde builder.
COPY --from=builder /app/out/json/ ./

# Instala dependencias con el lockfile congelado.
RUN pnpm install --frozen-lockfile

# Copia el código fuente completo desde builder.
COPY --from=builder /app/out/full/ ./

# Instala Turbo CLI globalmente.
RUN pnpm add -g turbo@^2

# Ejecuta el build con Turbo, filtrando el workspace.
# Nota: El script `build` en el package.json del workspace debe incluir `next build`.
RUN turbo run build --filter=$WORKSPACE

# =========================================================
# Etapa runner: Sirve archivos estáticos con Nginx
# =========================================================
FROM nginx:alpine AS runner

# Limpia el contenido por defecto de Nginx.
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos estáticos generados desde installer.
# Asume que el workspace @monorepo/other genera archivos en apps/other/out/.
COPY --from=installer /app/apps/other/out/ /usr/share/nginx/html/

# Expone el puerto 80 para acceder a la aplicación.
EXPOSE 80

# Inicia Nginx en modo foreground.
CMD ["nginx", "-g", "daemon off;"]