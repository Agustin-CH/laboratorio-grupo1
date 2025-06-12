#!/bin/bash

echo "🚀 Iniciando entorno de desarrollo..."

# Paso 1: Asegurarse que Colima esté corriendo
if ! colima status | grep -q "Running"; then
  echo "🟡 Colima no estaba corriendo. Iniciando..."
  colima start
else
  echo "🟢 Colima ya está corriendo."
fi

# Paso 2: Verificar si el contenedor ya existe
if ! docker ps -a --format '{{.Names}}' | grep -q "^mysql_ecommerce$"; then
  echo "📦 Contenedor MySQL no existe. Creando y levantando..."
  docker run --name mysql_ecommerce \
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=ecommerce_db \
    -p 3306:3306 \
    -d mysql:8
else
  if ! docker ps --format '{{.Names}}' | grep -q "^mysql_ecommerce$"; then
    echo "📦 Contenedor MySQL existe pero está detenido. Iniciando..."
    docker start mysql_ecommerce
  else
    echo "🟢 Contenedor MySQL ya está corriendo."
  fi
fi

# Paso 3: Esperar que MySQL esté completamente listo
echo "⌛ Esperando que MySQL esté disponible..."
until docker exec mysql_ecommerce mysqladmin ping -uroot -proot --silent &> /dev/null; do
  printf '.'
  sleep 1
done
echo -e "\n✅ MySQL está listo."

# Paso 4: Preguntar si querés iniciar Spring Boot
read -p "¿Querés iniciar Spring Boot ahora? (s/n): " respuesta
if [[ "$respuesta" == "s" ]]; then
  echo "🚀 Ejecutando Spring Boot con Maven..."
  ./mvnw spring-boot:run
else
  echo "🛑 Spring Boot no fue iniciado. Podés hacerlo manualmente con './mvnw spring-boot:run'"
fi
