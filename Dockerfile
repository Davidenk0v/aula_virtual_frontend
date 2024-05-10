FROM docker.io/library/postgres:14.0 AS postgres

# Configurar PostgreSQL
WORKDIR /var/lib/postgresql/data
COPY postgresql.conf /etc/postgresql/postgresql.conf
COPY initdb.sh /bin/initdb.sh

# Ejecutar PostgreSQL
RUN chmod +x /bin/initdb.sh && /bin/initdb.sh -p

# Exponer puerto 5432 para PostgreSQL
EXPOSE 5432


FROM quay.io/keycloak/keycloak:18.0 AS keycloak

# Configurar Keycloak
WORKDIR /opt/keycloak

# Exponer puerto 8080 para Keycloak
EXPOSE 8080


FROM backend-image AS backend

# Configurar backend Spring Boot
WORKDIR /app

# Copiar archivos del backend
COPY build/libs/*.jar app.jar

# Exponer puerto 8085 para el backend
EXPOSE 8085

# Configurar variables de entorno
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/postgres
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=1234
ENV KEYCLOAK_SERVER_URL=http://keycloak:9090/auth

# Ejecutar backend Spring Boot
CMD ["java", "-jar", "app.jar"]

FROM node:18-alpine AS frontend

# Configurar frontend Angular
WORKDIR /app

# Copiar archivos del frontend
COPY . .

# Instalar dependencias de Angular
RUN npm install

# Construir la aplicación Angular
RUN npm run build --prod

# Copiar artefactos compilados del frontend
COPY dist/* .

# Exponer puerto 4200 para el frontend
EXPOSE 4200

