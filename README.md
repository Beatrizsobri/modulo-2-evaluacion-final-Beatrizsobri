![Adalab](_src/assets/images/images.jpeg)

# Adalab evaluación módilo2: Buscador de series

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.
El ejercicio también tiene una parte de maquetación con HTML y Sass. 
Para el desarrollo de este ejercicio hemos utilizado la siguiente API: http://www.tvmaze.com/api#show-search

## Pasos seguidos para la creación de la App

1. Clonar el repositorio.
2. Descargar el Starter Kit.
2. Instala las dependencias locales con `npm install`.
3. Arranca el kit con `gulp`.
4. Añadir funcionalidades de JS.
5. Maquetar.
6. Readme. 

## FUNCIONALIDADES JS. 
## PRIMER PASO: TRAER INFORMACIÓN DE LA API CON LO DATOS INTRODUCIDOS EN EL CAMPO DEL BUSCADOR.
Al hacer clic sobre el botón de "Buscar", la aplicación se conecta al API de TVMaze para búsqueda de series. Por cada show contenido en el resultado de la búsqueda, se pinta una tarjeta donde mostramos una imagen de la serie y su título.

## SEGUNDO PASO: AÑADIR SERIES A FAVORITOS.
Una vez aparecen los resultados de búsqueda, podemos indicar cuáles son nuestras series favoritas. Para ello, al hacer clic sobre una serie, el color de fondo se intercambia, indicando así que es una serie favorita. Además. también, se muestra un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas.

## TERCER PASO: AÑADIR SERIES A FAVORITOS.
Al hacer clic sobre la serie dentro del apartado de Favoritos podemos borrar nuestras series favoritas. A su vez, también se desmarcará en el listado resultante de la búsqueda. 

## CUARTO PASO: RESET DE FAVORITOS.
Al pulsar el botón de "RESET" todas nuestras series favoritas se desmarcan.





