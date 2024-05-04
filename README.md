# AR_ModelViewController

En esta aplicación que utiliza Express.js y React, se implementa el patrón Modelo-Vista-Controlador (MVC) para gestionar la autenticación de usuarios. El proceso comienza cuando el usuario interactúa con la interfaz de usuario, ingresando sus credenciales en el "Login View". 
Estas credenciales se envían como una solicitud HTTP a través de la API proporcionada por Express.js. El controlador, denominado "UserController", recibe y procesa esta solicitud, pasando las credenciales al modelo de autenticación, el "AuthModel". 
Este último verifica las credenciales consultando la base de datos y, si son válidas, genera un token de autenticación que se devuelve al "UserController". Finalmente, el "UserController" envía la respuesta al "Login View", proporcionando un mensaje de éxito o error según el resultado de la autenticación. Este enfoque sigue los principios de separación de responsabilidades y facilita la escalabilidad y el mantenimiento del sistema.
![image](https://github.com/Ariel454/AR_ModelViewController/assets/121766763/edff7b45-1bac-4f5c-8806-36fa6b9bc5c0)
