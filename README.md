# Secret files API
API para aplicación de archivos "secretos" de Toolbox OTT

## Dependencias
Para utilizar este proyecto es necesaria la instalación de [NodeJS v14 y npm v6.](https://www.knowledgehut.com/blog/web-development/npm-install-specific-version)

## Instalación

 1. ### Clonar el repositorio:
	`git clone https://github.com/di-alba/toolbox-challenge-api.git`
 2. ### Instalar dependencias
	`npm install`
 3. ### Iniciar servidor
	`npm start`

Una vez iniciado el servidor la API estara disponible en localhost para el puerto 5000, es decir `https://localhost:5000`

## Pruebas
Para la realización de pruebas se puede usar el comando `npm test` y a traves de el se ejecutaran las pruebas con el uso  de [mocha](https://github.com/mochajs/mocha)
![image](https://user-images.githubusercontent.com/49533905/222899490-a3cbf657-2764-41c3-b90a-7abf4a862dd3.png)

## Endpoints

 - `/files/data`: Obtiene una lista de todos los archivos junto a su información de manera ordenada.
 ![image](https://user-images.githubusercontent.com/49533905/222899017-c2eba226-cf5c-4102-b879-4b7d627ad4b1.png)

 - `/files/data?fileName=<nombre_archivo>`: Permite obtener la información de un archivo en específico.
 ![image](https://user-images.githubusercontent.com/49533905/222899116-36354ee6-b374-4e28-adb8-c6c2ad242999.png)

 - `/files/list`: Muestra una lista de todos los archivos tal y como se obtienen de la API original externa.
![image](https://user-images.githubusercontent.com/49533905/222899192-2aa87797-9fd8-4fc6-bca3-17bdf060035f.png)
