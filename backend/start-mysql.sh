#!/bin/bash

echo "🐬 Iniciando contenedor MySQL con Docker Compose..."

docker-compose up -d

echo "⌛ Esperando que MySQL esté listo para aceptar conexiones..."

until docker exec mysql_ecommerce mysqladmin ping -uroot -prootpass --silent &> /dev/null; do
  printf "."
  sleep 1
done

echo -e "\n✅ MySQL está listo y corriendo en localhost:3306"

read -p "¿Querés entrar al monitor de MySQL (CLI)? (s/n): " respuesta
if [[ "$respuesta" == "s" ]]; then
  docker exec -it mysql_ecommerce mysql -uroot -prootpass
else
  echo "👌 Listo. Podés entrar luego con:"
  echo "    docker exec -it mysql_ecommerce mysql -uroot -prootpass"
fi
