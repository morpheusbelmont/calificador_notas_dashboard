/* ==================================================

    SERVICE WORKER

    CALIFICADOR ACADÉMICO DASHBOARD PRO

    Permite:
    - Instalación PWA
    - Funcionamiento offline
    - Caché de archivos


    Desarrollado por:
    Lic. Carlos Eduardo Sepúlveda Toro
    Diseñador Gráfico y Desarrollador Multimedia
    Especialista en Edumática

================================================== */



// Nombre de versión del caché

const CACHE_NAME =

"notas-pro-v1";




// Archivos principales


const archivos = [


    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./js/app.js",

    "./img/icono.png"


];





/* =============================

        INSTALACIÓN

============================= */


self.addEventListener(

"install",


evento=>{



evento.waitUntil(



caches.open(

CACHE_NAME


)


.then(


cache=>{


return cache.addAll(

archivos

);


}



)



);



}



);










/* =============================

       ACTIVACIÓN

============================= */


self.addEventListener(

"activate",

evento=>{


console.log(

"Aplicación académica activada"

);


}

);










/* =============================

      TRABAJO OFFLINE

============================= */


self.addEventListener(

"fetch",

evento=>{



evento.respondWith(




caches.match(

evento.request


)


.then(

respuesta=>{


return respuesta ||


fetch(

evento.request

);


}



)



);



}

);
