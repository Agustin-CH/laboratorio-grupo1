#!/usr/bin/env bash

# Nombre del contenedor y credenciales
DB_CONTAINER="mysql_ecommerce"
DB_NAME="ecommerce"
DB_USER="root"
DB_PASS="rootpass"  # ajusta si tu contraseña es distinta

echo "🔍 Obteniendo lista de tablas en '$DB_NAME'..."
tables=$(docker exec $DB_CONTAINER mysql -N -u$DB_USER -p$DB_PASS -e "SHOW TABLES IN $DB_NAME;")

if [[ -z "$tables" ]]; then
  echo "❌ No se encontraron tablas en la DB '$DB_NAME'."
  exit 1
fi

for table in $tables; do
  echo
  echo "📋 Tabla: $table"
  echo "----------------------------------------------------"
  if [[ "$table" == "products" ]]; then
    # Solo name y stock
    docker exec $DB_CONTAINER \
      mysql -u$DB_USER -p$DB_PASS -e \
      "SELECT name, stock FROM $DB_NAME.$table;"
  else
    # Todos los campos
    docker exec $DB_CONTAINER \
      mysql -u$DB_USER -p$DB_PASS -e \
      "SELECT * FROM $DB_NAME.$table;"
  fi
done

echo
echo "✅ ¡Listo! Se volcaron todos los datos."
