# TAREA 6

## Codigos de respuestas HTTP

Son códigos de tres dígitos:

    * 1xx Mensajes

    N° - 100 111    Conexión rechazada

    * 2xx Operación exitosa

    N°    Descripción
    200    OK
    201-203 Información no oficial
    204    Sin Contenido
    205    Contenido para recargar
    206    Contenido parcial

    * 3xx Redirección hacia otro URL

    N°    Descripción
    300    Múltiples posibilidades
    301    Mudado permanentemente
    302    Encontrado
    303    Vea otros
    304    No modificado
    305    Utilice un proxy
    307    Redirección temporal

    * 4xx Error por parte del cliente

    N°    Descripción
    400    Solicitud incorrecta
    401    No autorizado
    402    Pago requerido
    403    Prohibido
    404    No encontrado
    405    Método no permitido
    406    No aceptable
    407    Proxy requerido
    408    Tiempo de espera agotado
    409    Conflicto
    410    Ya no disponible
    411    Requiere longitud
    412    Falló precondición
    413    Entidad de solicitud demasiado larga
    414    URL de solicitud demasiado largo
    415    Tipo de medio no soportado
    416    Rango solicitado no disponible
    417    Falló expectativa

    * 5xx Error por parte del servidor

    N°    Descripción
    500    Error interno
    501    No implementado
    502    Pasarela incorrecta
    503    Servicio no disponible
    504    Tiempo de espera de la pasarela agotado
    505    Versión de HTTP no soportada

[Ver pagina web](https://sites.google.com/site/conceptoprogramacion/request-response)


## Diferencias entre URL y URI

### ¿Qué es una URI?

URI son las siglas de Uniform Resource Identifier, es decir, identificador de recursos uniforme. Te habrás quedado como antes, así que voy a aclararlo.

Internet se dice que está habitado por muchos puntos de contenido. Pues bien, un URI es el camino para identificar cualquiera de esos puntos de contenido, ya sea una página de texto, un vídeo o un clip de sonido, una imagen fija o animada, o un programa.

Por tanto, una URI es una cadena de caracteres que se utilizan para identificar un nombre o un recurso en Internet.

### ¿Qué es una URL?

URL significa Uniform Resource Locator, es decir, Localizador Uniforme de Recursos. básicamente es un conjunto de letras y símbolos que identifica un recurso, habitualmente una página concreta, dentro de una web. 

## Protocolo HTTP

Comenzaremos por decir que HTTP significa "Protocolo de trasferencia de hipertexto", además pertenece al grupo TCP/IP y se creó fundamentalmente para publicar páginas HTML. Es uno de los protocolos más utilizados actualmente.

Su funcionamiento básico es el siguiente: Un navegador manda una solicitud GET al servidor y pide un archivo, el servidor responde enviando al navegador el código de ese archivo, que posteriormente es descifrado por el navegador.

HTTP utiliza tres tipos de mensajes para enviar la información y recibirla del navegador.

#### 1. GET
#### 2. POST
#### 3. PUT

- **_Get_**: 
 
Se trata de un mensaje con solicitud de datos por parte del cliente, es decir, un navegador web envía el mensaje GET para solicitar paginas al servidor.

- **_Post y Put_**: 

Estos dos tipos de mensajes son utilizados por el servidor para enviar información al navegador web. En concreto, "Post" incluye la información en el mensaje enviado al servidor y "Put" carga el contenido en el servidor.

Mencionar que este protocolo es poco seguro, ya que la información que maneja puede ser interceptada y leída sin problema. Por este motivo nace el protocolo HTTPS, que no es más que el mismo protocolo, y que sin embargo envía la información encriptada para que si es interceptada no sea fácil su lectura.