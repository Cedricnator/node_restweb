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