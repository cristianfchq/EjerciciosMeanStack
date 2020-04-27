# TAREA 3

## Uso de Docker y Robo 3T

Docker es un programa de código abierto que permite que una aplicación Linux y sus dependencias se empaqueten como un contenedor. La virtualización basada en contenedores aísla las aplicaciones entre sí en un sistema operativo (OS) compartido. Este enfoque estandariza la entrega del programa de la aplicación, permitiendo que las aplicaciones se ejecuten en cualquier entorno Linux, ya sea físico o virtual. Dado que comparten el mismo sistema operativo, los contenedores son portátiles entre diferentes distribuciones de Linux, y son significativamente más pequeños que las imágenes de máquinas virtuales (VM).

Visita la pagina oficial de [Docker](https://www.docker.com/)

- ### _Descargando una imagen de mongo, creando un contenedor e ingresando al contenedor_ ###

Viendo la versión de Docker

>```javascript
>$ docker --version
>```

<p align="center">
  <img src="descargarIMGcrearConten/1.png" title="Version de Docker">
</p>

Descargando la imagen de mongo

>```javascript
>$ docker pull mongo
>```

<p align="center">
  <img src="descargarIMGcrearConten/2.png" title="Version de Docker" width="500" height="300">
</p>

<p align="center">
  <img src="descargarIMGcrearConten/3.png" title="Version de Docker">
</p>

Ahora se puede ver que se tiene la imagen de mongo descargada con:

>```javascript
>$ docker image ls
>```

Y también se puede listar los contenedores que se tiene y se verá que no tenemos ni un contenedor.

>```javascript
>$ docker pull mongo
>```

<p align="center">
  <img src="descargarIMGcrearConten/4.png" title="Version de Docker">
</p>

Se puede crear un contenedor con el siguiente comando donde el nombre del contenedor sera **_miContenedor_**.

>```javascript
>$ docker run --name miContenedor -d mongo
>```

<p align="center">
  <img src="descargarIMGcrearConten/5.png" title="Version de Docker">
</p>

Se puede listar todos los contenedores que creamos, en este caso al listar solo nos mostraría nuestro contenedor creado **_miContendor_**.

>```javascript
>$ docker ps -a
>```

<p align="center">
  <img src="descargarIMGcrearConten/6.png" title="Version de Docker">
</p>

Una vez creado el contenedor se puede iniciar el contenedor detener el contenedor y eliminar el contendor.

>```javascript
>// Se detiene el contenedor con:
>$ docker stop miContenedor
>// tambien se puede colocar los primeros numeros de CONTAINER ID del contenedor (docker stop 923)
>```
>```javascript
>// Se inicia el contenedor con:
>$ docker start miContenedor    
>// tambien se puede colocar los primeros numeros de CONTAINER ID del contenedor (docker start 923)
>```
>```javascript
>// Se elimina el contenedor con:
>$ docker rm miContenedor       
>// tambien se puede colocar los primeros numeros de CONTAINER ID del contenedor (docker rm 923)
>```

Ejemplo de iniciar detener y eliminar un contenedor:

<p align="center">
  <img src="descargarIMGcrearConten/7.png" title="Version de Docker">
</p>

Una vez creado un contenedor podemos ingresar al contenedor con:

>```javascript
>$ docker exec -it fe4 bash
>// Donde fe4 es el CONTAINER ID del contenedor creado con nombre "miContenedor"
>```

***Ojo:*** Para Ingresar a un contenedor, el contenedor tiene que estar corriendo y si no esta corriendo debemos colocar el siguiente comando `docker start <nombreContenedor>` 

Una vez ingresado al contendor se puede notar que es una terminal de Linux, donde se puede colocar comandos de linux, en nuestro caso colocamos el comando `ls -l`.


<p align="center">
  <img src="descargarIMGcrearConten/8.png" title="Version de Docker">
</p>

Como descargamos una imagen mongo, podremos ver que si ejecutamos el comando `mongo` en la terminal del contenedor, entrara a la terminal de mongo instalado en el contenedor.

>```ruby
>$ mongo        # esto en la terminal del contenedor
>```

<p align="center">
  <img src="descargarIMGcrearConten/9.png" title="Version de Docker">
</p>

Y se puede ver que podemos crear bases de datos e insertar documentos.

<p align="center">
  <img src="descargarIMGcrearConten/10.png" title="Version de Docker">
</p>

<br>
<br>

- ### Docker-compose y conectar con Robo 3T ###

[Docker-compose](https://docs.docker.com/compose/)

>```ruby
># version de docker compose que utilizaremos para compilar este archivo
>version: '3.7'
># servicios=contenedores que crearemos con docker compose
>services:
>  # primer servicio=contenedor
>  mongo:
>    # nombre del contenedor
>    container_name: tscNodejs
>    # imagen que usaremos
>    image: newimagemongo
>    # reinicia el contenedor si algo sale mal
>    restart: always
>    # volumenes a compartir
>    volumes:
>      - /filesFromTypeScript:/sharedData
>      # utiliza el volumen declarado como "mongodatabases" en la seccion de volumes
>      # y guarda todos los datos generados en la ruta "/data/db"
>      #- mongodatabases:/datasDB/db
>    # habilitar la autenticacion de mongo
>    command: [--auth]
>    # puertos
>    ports:  
>      - 22140:22140
>    # variables de entorno
>    environment:
>      MONGO_INITDB_ROOT_USERNAME: root
>      MONGO_INITDB_ROOT_PASSWORD: root
>```