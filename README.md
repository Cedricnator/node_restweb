## Integrar Base de datos postgreSQL

1.  Docker compose
2. Variables de entorno
3. Instalar prisma
```bash
$ npm install prisma 
```
```bash
$ npx prisma init --datasource-provider postgresql
```
4. Definir nuestros modelos en schema.prisma
5. Hacer una migración con
```bash
$ npx prisma migrate dev --name init
```

5. Si no quieres tener tus _primsa_migrations en tu database, es decir, la tabla. Puedes tener un shadow database donde definas todos tus schemas o esquemas.



## Implementar Arquitectura limpia
# Dominio
Siguiendo el principio de Domain Driven Design
1. En domain, crear nuestra entidad
2. Datasources, sera nuestro origen de datos
3. Repositories, sera nuestros metodos para llegar a datasources
4. Son clases abstractas o interfaces. En el fondo, lo que buscamos es obligar que nuestros objetos luzcan de la apariencia de nosotros esperamos.

# Infrastructure
Las implementaciones se colocan dentro de infrastructure

