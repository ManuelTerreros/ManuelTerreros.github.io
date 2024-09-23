Proyecto Calculadora IPv4
Por: Manuel Alejandro Terreros Rodríguez
Redes de Datos 1

Descripción
Este proyecto consiste en una calculadora de direcciones IP, implementada utilizando JavaScript y HTML. En su forma inicial, el usuario puede interactuar directamente con el archivo HTML y el script de JavaScript, permitiendo calcular y visualizar información relevante sobre direcciones IP, como la red, el broadcast, el rango de hosts, y la clasificación de la IP.

Sin embargo, para cumplir con los requisitos del docente, el proyecto ha sido ampliado para ejecutarse sobre un servidor utilizando Node.js (versión 20.17.0 LTS), lo que permite una mayor flexibilidad y escalabilidad. El archivo aplicativo.js es el responsable de definir y configurar el servidor que entrega la aplicación web al usuario.

Configuración del servidor
El archivo aplicativo.js utiliza el framework Node.js para crear y configurar un servidor HTTP. Este servidor es responsable de servir los archivos estáticos (HTML, CSS, JS) y manejar las solicitudes de los usuarios, permitiendo la ejecución fluida del aplicativo desde el navegador.

El servidor está configurado para escuchar en el puerto 8080 y sirve el archivo index.html como la página principal, permitiendo al usuario interactuar con la calculadora de IP.

Requisitos
Node.js (v20.17.0)
Visual Studio Code

Ejecución
Habiendo instalado Node.js, se realiza la prueba en la terminal(Linux) o CMD(Windows) con el comando: 

node -v 

De esta manera sabremos que node está activo.

Para ejecutar el servidor del aplicativo, se debe redireccionar la terminal o al CMD a la carpeta del proyecto y ejecutar el siguiente comando:

node aplicativo.js

