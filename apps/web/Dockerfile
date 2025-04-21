# ─── 1) Base: Node + pnpm via Corepack ──────────────────────────────────────────────
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat \
  && corepack enable \
  && corepack prepare pnpm@latest --activate

# ─── 2) Builder: Turbo prune del workspace + actualizar lockfile ─────────────────────
ARG WORKSPACE=@monorepo/web
FROM base AS builder
WORKDIR /repo
COPY . .

# Prune y luego actualiza solo el lockfile pruned
RUN npx turbo prune $WORKSPACE --docker \
  && cd out/json \
  && pnpm install --lockfile-only

# ─── 3) Installer + Static Export ────────────────────────────────────────────────
FROM base AS exporter
ARG WORKSPACE=@monorepo/web
WORKDIR /app

# 3.1) Copiamos lockfile & package.json recortados e instalamos deps congeladas
COPY --from=builder /repo/out/json/ .
RUN pnpm install --frozen-lockfile

# 3.2) Preparamos estructura de código: apps y paquetes reutilizables
RUN mkdir -p apps/web packages/typescript-config packages/eslint-config packages/ui
COPY --from=builder /repo/out/full/apps/web ./apps/web
COPY --from=builder /repo/out/full/packages/typescript-config ./packages/typescript-config
COPY --from=builder /repo/out/full/packages/eslint-config ./packages/eslint-config
COPY --from=builder /repo/out/full/packages/ui ./packages/ui

# 3.3) Entramos al workspace y exportamos (next build && next export)
WORKDIR /app/apps/web
RUN pnpm run build

# ─── 4) Runner: servir estáticos con Nginx ───────────────────────────────────────
FROM nginx:alpine AS runner

# Limpiamos contenido default
RUN rm -rf /usr/share/nginx/html/*

# Copiamos los archivos estáticos generados desde el workspace
COPY --from=exporter /app/apps/web/out/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
