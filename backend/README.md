# 🛒 E-commerce Backend - Spring Boot + MySQL

Este proyecto es un backend simple de e-commerce desarrollado en Java con Spring Boot. Expone endpoints REST para administrar productos y utiliza MySQL como base de datos relacional.

## 🧰 Tecnologías utilizadas

- Java 17+
- Spring Boot 3.5.0
- Spring Data JPA
- MySQL 8 (en Docker)
- Maven
- Lombok

---

## 🚀 Requisitos previos

Antes de empezar, asegurate de tener instalado:

- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/download.cgi)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/)

---

## ⚙️ Configuración del entorno

### 1. Clonar el repositorio

git clone https://github.com/tuusuario/ecommerce-backend.git
cd ecommerce-backend/backend

### 2. Levantar la base de datos MySQL
Ejecutá el siguiente comando desde la carpeta backend (donde está el docker-compose.yml):

docker-compose up -d

### 4. Construir y correr la aplicación
./mvnw spring-boot:run

