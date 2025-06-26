# Etapa 1: Build con Maven (multi‐arch)
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copiamos sólo el pom para cachear dependencias
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN mvn dependency:go-offline -B

# Copiamos el código y empacamos
COPY src src
RUN mvn clean package -DskipTests -B

# Etapa 2: runtime ligero
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app
# Copiamos el jar resultante
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
