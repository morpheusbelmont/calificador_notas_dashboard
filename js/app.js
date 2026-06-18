/* =====================================================

 CALIFICADOR ACADÉMICO DASHBOARD PRO
 HTML5 + BOOTSTRAP + JAVASCRIPT

 Desarrollado por:
 Lic. Carlos Eduardo Sepúlveda Toro
 Diseñador Gráfico y Desarrollador Multimedia
 Especialista en Edumática

===================================================== */



/* ==========================
      BASES DE DATOS
========================== */


let actividades =
JSON.parse(localStorage.getItem("notas")) || [];


let grupo =
JSON.parse(localStorage.getItem("grupo")) || [];


let grafico;





/* ==========================
        INICIO APP
========================== */


window.onload = ()=>{


document.getElementById("fecha").value =

new Date().toLocaleDateString();



actualizarDashboard();

actualizarGrupo();



setTimeout(()=>{


document.getElementById("loader")

.style.display="none";


},1200);



};










/* ==========================
      AGREGAR NOTAS
========================== */


function agregarNota(){



let nombre =

document.getElementById("nombre").value;



let nota =

parseFloat(

document.getElementById("nota").value

);



let porcentaje =

parseFloat(

document.getElementById("porcentaje").value

);





if(
nombre=="" ||

isNaN(nota) ||

isNaN(porcentaje)

){


alert("Completa los campos");


return;


}





if(nota<0 || nota>5){


alert("La nota debe ser de 0 a 5");


return;


}






let suma =

actividades.reduce(

(a,b)=> a+b.porcentaje,

0

);





if(suma+porcentaje>100){


alert("El porcentaje supera 100%");


return;


}






actividades.push({


nombre,

nota,

porcentaje


});




guardar();



actualizarDashboard();




document.getElementById("nombre").value="";

document.getElementById("nota").value="";

document.getElementById("porcentaje").value="";



}









/* ==========================
      ACTUALIZAR PANEL
========================== */


function actualizarDashboard(){



let tabla =

document.getElementById("tablaNotas");



tabla.innerHTML="";




let final=0;

let porcentaje=0;






actividades.forEach(

(item,i)=>{


final +=

(item.nota*item.porcentaje)/100;



porcentaje += item.porcentaje;






tabla.innerHTML +=`

<tr>


<td>${item.nombre}</td>


<td>${item.nota.toFixed(1)}</td>


<td>${item.porcentaje}%</td>



<td>


<button

class="btn btn-danger btn-sm"

onclick="eliminar(${i})">


X


</button>


</td>


</tr>

`;


});


document.getElementById("notaFinal")

.innerHTML = final.toFixed(2);




document.getElementById("porcentajeTotal")

.innerHTML = porcentaje;




document.getElementById("contador")

.innerHTML = actividades.length;







let estado =

document.getElementById("estado");





if(final>=3){


estado.innerHTML="APROBADO";

estado.style.color="#22c55e";


}


else if(final>0){


estado.innerHTML="REPROBADO";

estado.style.color="#ef4444";


}


else{


estado.innerHTML="Sin evaluar";


}






actualizarNivel(final);


actualizarGrafica();



}










/* ==========================
        ELIMINAR
========================== */


function eliminar(i){


actividades.splice(i,1);


guardar();


actualizarDashboard();


}









/* ==========================
       LOCAL STORAGE
========================== */


function guardar(){


localStorage.setItem(

"notas",

JSON.stringify(actividades)

);


}










/* ==========================
      SISTEMA XP
========================== */


function actualizarNivel(nota){



let xp = nota*20;


let nivel="Aprendiz";

let icono="🎓";




if(nota>=4.5){


nivel="Maestro";

icono="🏆";


}


else if(nota>=4){


nivel="Experto";

icono="🥇";


}


else if(nota>=3){


nivel="Explorador";

icono="⭐";


}





document.getElementById("nivel")

.innerHTML=nivel;



document.getElementById("insignia")

.innerHTML=icono;




document.getElementById("barraXP")

.style.width=xp+"%";


}










/* ==========================
       GRAFICA
========================== */


function actualizarGrafica(){



let canvas =

document.getElementById("graficaNotas");




if(grafico){

grafico.destroy();

}




grafico = new Chart(canvas,{



type:"bar",



data:{



labels:

actividades.map(x=>x.nombre),




datasets:[{


label:"Notas",

data:

actividades.map(x=>x.nota)


}]



},




options:{



scales:{



y:{


min:0,

max:5


}


}


}



});



}











/* ==========================
      MODO PROFESOR
========================== */


function guardarEstudiante(){



let nombre =

document.getElementById("estudiante").value;




let materia =

document.getElementById("asignatura").value;





let nota =

parseFloat(

document.getElementById("notaFinal")

.innerHTML

);






grupo.push({

nombre,

materia,

nota


});





localStorage.setItem(

"grupo",

JSON.stringify(grupo)

);




actualizarGrupo();



}









function actualizarGrupo(){



let tabla =

document.getElementById("tablaGrupo");



tabla.innerHTML="";





grupo.forEach(

e=>{


tabla.innerHTML +=`

<tr>


<td>${e.nombre}</td>


<td>${e.materia}</td>


<td>${e.nota}</td>


</tr>

`;


});


crearRanking();



}










/* ==========================
        RANKING
========================== */


function crearRanking(){



let ranking =

document.getElementById("ranking");



ranking.innerHTML="";




[...grupo]


.sort(

(a,b)=>b.nota-a.nota

)


.forEach(

e=>{


ranking.innerHTML +=


`

<li>

🏅 ${e.nombre}

${e.nota}

</li>

`;


}

);



}











/* ==========================
          PDF
========================== */


function crearPDF(){



const {jsPDF}=window.jspdf;



let pdf = new jsPDF();



pdf.text(

"Reporte Academico",

20,

20

);




pdf.text(

"Nota Final: "+

document.getElementById("notaFinal").innerHTML,

20,

40

);




pdf.text(

"Desarrollado por Carlos Eduardo Sepulveda Toro",

20,

270

);




pdf.save(

"reporte.pdf"

);



}









/* ==========================
          CSV
========================== */


function exportarCSV(){



let texto=

"Nombre,Asignatura,Nota\n";




grupo.forEach(

x=>{


texto+=

`${x.nombre},${x.materia},${x.nota}\n`;


}

);





let blob=

new Blob(

[texto]

);




let a=

document.createElement("a");



a.href=

URL.createObjectURL(blob);



a.download=

"notas.csv";



a.click();



}










/* ==========================
        REINICIAR
========================== */


function reiniciar(){



actividades=[];


guardar();



actualizarDashboard();



}










/* ==========================
        TEMA
========================== */


function modoTema(){


document.body.classList.toggle(

"light"

);


}
