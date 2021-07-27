# Vehiculos API Rest

## Tabla de contenidos

- [Acerca](#Acerca)
- [Empezar](#Como_empezar)
- [Usos](#Usos)

## Acerca <a name = "Acerca"></a>
---
Aplicación API Rest desarrollada en Node.js para realizar operación CRUD sobre vehículos. Se implementaron algunas validaciones y pruebas básicas utilizando Jest y Supertest

## Empezar <a name = "Como_empezar"></a>
---
Para empezar a usar esta aplicación deberás clonar este repositorio y descargar las dependencias necesarias con npm

### Pre-requisitos

Cosas que necesitas tener instaladas para ejecutar la aplicación:

```
Node
Npm Package Manager
```

## Usos <a name = "Usos"></a>
---
Rutas registradas en la API
```
GET - /vehiculos/ 
Obtener todos los vehiculos en la base de datos
```


```
GET - /vehiculos/find?
Realizar una búsqueda mediante query utilizando algunos parámetros opcionales: nombre, año de fabricación o marca
```
```
GET - /vehiculos/:id
Buscar un vehículo utilizando un id
```
```
POST - /vehiculos/
Registrar un nuevo un vehículo. Parámetros necesarios: nombre, marca, descripción, año de fabricación y si fue vendido o no
```
```
PUT - /vehiculos/
Modificar completamente la información de un vehículo mediante id y datos validos para cada propiedad del vehículo
```
```
PATCH - /vehiculos/:id
Actualizar parte de la información de un vehículo utilizando un id y datos opcionales del vehículo
```
```
DELETE - /vehiculos/:id
Eliminar un vehículo de la base de datos utilizando un id
```