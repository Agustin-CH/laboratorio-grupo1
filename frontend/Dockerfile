# etapa de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# etapa de producción
FROM nginx:stable-alpine
# 1) Copiamos la configuración de nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# 2) Copiamos los estáticos resultantes de CRA
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
