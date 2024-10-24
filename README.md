# Proyecto API REST para Restaurante

Este proyecto es una API REST para gestionar los recursos de un restaurante, como alimentos, mesas y meseros, utilizando **NestJS**, **TypeORM**, **PostgreSQL** y **Redis** para la caché. El entorno está completamente dockerizado.

## Tecnologías Utilizadas

- [x] **NestJS**: Framework para construir aplicaciones del lado del servidor.
- [x] **TypeORM**: ORM para gestionar la base de datos relacional.
- [x] **PostgreSQL**: Base de datos relacional utilizada en el proyecto.
- [x] **Redis**: Sistema de caché externo para mejorar el rendimiento.
- [x] **Swagger**: Documentación automática de API.
- [x] **Docker**: Contenerización y despliegue de servicios.
- [x] **Docker Compose**: Orquestación de contenedores para el entorno de desarrollo.
- [x] **npm**: Gestor de paquetes para instalar dependencias del proyecto.

## Requisitos Previos

- [x] **Docker** instalados en tu máquina.
- [x] **DataGrip**: Herramienta de administración de bases de datos.

## Instalación

1. Clona el repositorio:
```bash
   git clone https://github.com/MartinLunaRogel/Api-Rest-Restaurant.git
 ```
2. Accede el directoriodel proyecto:
```bash
   cd restaurante-api
```
3. Crea tus variables de entorno en tu archivo .env

4. Iniciar los servicios y descargar las dependencias:
```bash
   docker-compose up
```

## Uso

1. Uso del Swagger
Una vez que este corriendo, puedes acceder a la docunmentación y uso del API en Swagger a travez de la siguiente URL:
```bash
   http://localhost:3000/api
```

