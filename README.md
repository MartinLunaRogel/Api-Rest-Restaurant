# REST API de Restaurante

Esta es una REST API para la gestión de alimentos, mesas y meseros en un restaurante, desarrollada con NestJS y TypeORM.

## Tecnologías Utilizadas

- **NestJS**: Framework para construir aplicaciones del lado del servidor.
- **TypeORM**: ORM para TypeScript y JavaScript.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Redis**: Almacenamiento en caché para mejorar el rendimiento.
- **Docker**: Contenerización de la aplicación para facilitar el despliegue.
- **Swagger**: Documentación de la API.

## Requisitos Previos

- Tener Docker instalado

## Instalación y Uso

Asegúrate de que el archivo `.env` esté correctamente configurado con tus credenciales de base de datos y Redis.

Ejecuta el siguiente comando para descargar e iniciar todos los servicios:

-> docker-compose up

Una vez que los contenedores estén en funcionamiento, puedes acceder a la API en http://localhost:3000/api.

La documentación de la API está disponible en http://localhost:3000/api.
