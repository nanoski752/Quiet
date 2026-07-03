/* =====================================================
   QUIET
   SCRIPT.JS
=====================================================*/

// ---------- VARIABLES ----------

let horaDormir = null;
let minutoDormir = 0;

let horaDespertar = null;
let minutoDespertar = 0;

let racha = 0;

let idioma = "es";

let llamaEncendida = false;

// ---------- ELEMENTOS ----------

const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");

const modalDormir = document.getElementById("modalDormir");
const modalDespertar = document.getElementById("modalDespertar");
const modalContactos = document.getElementById("modalContactos");
const modalRanking = document.getElementById("modalRanking");

const horario = document.getElementById("horario");

const rachaTexto = document.getElementById("rachaTexto");

const tuRacha = document.getElementById("tuRacha");

const fire = document.getElementById("fire");

const notification = document.getElementById("notification");

// ---------- INICIO ----------

window.onload = function(){

cargarDatos();

actualizarRacha();

actualizarHorario();

};

// ---------- PANTALLAS ----------

function entrar(){

loginScreen.classList.remove("active");

homeScreen.classList.add("active");

}

// ---------- MODALES ----------

function abrirDormir(){

modalDormir.classList.add("active");

}

function cerrarDormir(){

modalDormir.classList.remove("active");

}

function abrirDespertar(){

modalDespertar.classList.add("active");

}

function cerrarDespertar(){

modalDespertar.classList.remove("active");

}

function abrirContactos(){

modalContactos.classList.add("active");

}

function cerrarContactos(){

modalContactos.classList.remove("active");

}

function abrirRanking(){

modalRanking.classList.add("active");

}

function cerrarRanking(){

modalRanking.classList.remove("active");

}

// ---------- NOTIFICACIÓN ----------

function cerrarNotificacion(){

notification.classList.add("oculto");

}

function mostrarNotificacion(){

notification.classList.remove("oculto");

  }
// ---------- GUARDAR HORA DE DORMIR ----------

function guardarHoraDormir(){

const h = parseInt(document.getElementById("horaDormir").value);

const m = parseInt(document.getElementById("minutoDormir").value);

if(isNaN(h) || isNaN(m)){

alert("Completa una hora válida.");

return;

}

if(h<0 || h>23 || m<0 || m>59){

alert("La hora ingresada no es válida.");

return;

}

horaDormir = h;

minutoDormir = m;

guardarDatos();

actualizarHorario();

cerrarDormir();

}

// ---------- GUARDAR HORA DE DESPERTAR ----------

function guardarHoraDespertar(){

const h = parseInt(document.getElementById("horaDespertar").value);

const m = parseInt(document.getElementById("minutoDespertar").value);

if(isNaN(h) || isNaN(m)){

alert("Completa una hora válida.");

return;

}

if(h<0 || h>23 || m<0 || m>59){

alert("La hora ingresada no es válida.");

return;

}

if(horaDormir===null){

alert("Primero debes configurar la hora de dormir.");

return;

}

const dormirMinutos = horaDormir*60+minutoDormir;

let despertarMinutos = h*60+m;

if(despertarMinutos<=dormirMinutos){

despertarMinutos+=1440;

}

if(despertarMinutos-dormirMinutos<480){

alert("Debes dormir al menos 8 horas.");

return;

}

horaDespertar=h;

minutoDespertar=m;

guardarDatos();

actualizarHorario();

cerrarDespertar();

}

// ---------- ACTUALIZAR INFORMACIÓN ----------

function actualizarHorario(){

if(horaDormir===null || horaDespertar===null){

horario.innerHTML="Aún no configuraste un horario.";

return;

}

let inicio=(horaDormir*60+minutoDormir)-120;

if(inicio<0){

inicio+=1440;

}

const inicioHora=Math.floor(inicio/60);

const inicioMinuto=inicio%60;

const textoInicio=

String(inicioHora).padStart(2,"0")+":"+

String(inicioMinuto).padStart(2,"0");

const textoDormir=

String(horaDormir).padStart(2,"0")+":"+

String(minutoDormir).padStart(2,"0");

const textoDespertar=

String(horaDespertar).padStart(2,"0")+":"+

String(minutoDespertar).padStart(2,"0");

horario.innerHTML=

"No deberás utilizar el teléfono desde <b>"+

textoInicio+

"</b> hasta <b>"+

textoDespertar+

"</b>.<br><br>La hora elegida para dormir es <b>"+

textoDormir+

"</b>.";

  }
// ---------- LOCAL STORAGE ----------

function guardarDatos(){

const datos={

horaDormir,

minutoDormir,

horaDespertar,

minutoDespertar,

racha,

llamaEncendida,

idioma

};

localStorage.setItem(

"quietData",

JSON.stringify(datos)

);

}

function cargarDatos(){

const datos=localStorage.getItem("quietData");

if(!datos){

return;

}

const guardado=JSON.parse(datos);

horaDormir=guardado.horaDormir;

minutoDormir=guardado.minutoDormir;

horaDespertar=guardado.horaDespertar;

minutoDespertar=guardado.minutoDespertar;

racha=guardado.racha||0;

llamaEncendida=guardado.llamaEncendida||false;

idioma=guardado.idioma||"es";

const selector=document.getElementById("language");

if(selector){

selector.value=idioma;

}

}

// ---------- RACHA ----------

function actualizarRacha(){

rachaTexto.textContent=racha+" día"+(racha===1?"":"s");

tuRacha.textContent=racha+" 🔥";

if(llamaEncendida){

fire.classList.add("active");

}else{

fire.classList.remove("active");

}

guardarDatos();

}

function completarDia(){

if(llamaEncendida){

return;

}

llamaEncendida=true;

racha++;

actualizarRacha();

}

function reiniciarRacha(){

llamaEncendida=false;

racha=0;

actualizarRacha();

}

function nuevoDia(){

llamaEncendida=false;

actualizarRacha();

}

// ---------- SIMULACIONES ----------

function simularCumplimiento(){

completarDia();

alert("¡Día completado! La racha aumentó.");

}

function simularIncumplimiento(){

reiniciarRacha();

alert("Se utilizó el teléfono fuera del horario permitido. La racha volvió a 0.");

  }
// ---------- SIMULADOR (MODO DESARROLLADOR) ----------

function simular15Minutos(){

mostrarNotificacion();

}

function simularHoraLimite(){

alert(

"Ha llegado la hora límite.\n\nA partir de este momento no deberías utilizar el teléfono."

);

}

function simularNuevoDia(){

nuevoDia();

alert(

"Comenzó un nuevo día.\n\nLa llama vuelve a gris hasta completar nuevamente el objetivo."

);

}

// ---------- IDIOMAS ----------

function cambiarIdioma(){

const selector=document.getElementById("language");

idioma=selector.value;

guardarDatos();

switch(idioma){

case "es":

document.title="Quiet";

break;

case "en":

document.title="Quiet";

break;

case "pt":

document.title="Quiet";

break;

case "fr":

document.title="Quiet";

break;

case "de":

document.title="Quiet";

break;

case "it":

document.title="Quiet";

break;

}

}

// ---------- UTILIDADES ----------

function formatearHora(h,m){

return String(h).padStart(2,"0")+":"+String(m).padStart(2,"0");

}

function minutosTotales(h,m){

return h*60+m;

}

function diferenciaHoras(inicio,fin){

let diferencia=fin-inicio;

if(diferencia<0){

diferencia+=1440;

}

return diferencia;

}

// ---------- EFECTO LLAMA ----------

function encenderLlama(){

llamaEncendida=true;

fire.classList.add("active");

guardarDatos();

}

function apagarLlama(){

llamaEncendida=false;

fire.classList.remove("active");

guardarDatos();

}

// ---------- REINICIO TOTAL ----------

function reiniciarAplicacion(){

if(!confirm("¿Seguro que quieres borrar todos los datos?")){

return;

}

localStorage.removeItem("quietData");

horaDormir=null;

minutoDormir=0;

horaDespertar=null;

minutoDespertar=0;

racha=0;

llamaEncendida=false;

actualizarHorario();

actualizarRacha();

alert("Todos los datos fueron eliminados.");

}
// ---------- RELOJ ANALÓGICO ----------

let relojActivo=null;

let arrastrando=false;

function abrirDormir(){

modalDormir.classList.add("active");

relojActivo="dormir";

actualizarReloj();

}

function abrirDespertar(){

modalDespertar.classList.add("active");

relojActivo="despertar";

actualizarReloj();

}

function actualizarReloj(){

const horaHand=document.getElementById("horaHand");

const minutoHand=document.getElementById("minutoHand");

if(!horaHand||!minutoHand){

return;

}

let hora=0;

let minuto=0;

if(relojActivo==="dormir"){

hora=horaDormir??22;

minuto=minutoDormir??0;

}else{

hora=horaDespertar??6;

minuto=minutoDespertar??0;

}

const anguloHora=((hora%12)*30)+(minuto*0.5);

const anguloMinuto=minuto*6;

horaHand.style.transform=

"translateX(-50%) rotate("+anguloHora+"deg)";

minutoHand.style.transform=

"translateX(-50%) rotate("+anguloMinuto+"deg)";

}

// ---------- ENTRADAS MANUALES ----------

function sincronizarHoraManual(){

if(relojActivo==="dormir"){

horaDormir=parseInt(document.getElementById("horaDormir").value)||0;

minutoDormir=parseInt(document.getElementById("minutoDormir").value)||0;

}else{

horaDespertar=parseInt(document.getElementById("horaDespertar").value)||0;

minutoDespertar=parseInt(document.getElementById("minutoDespertar").value)||0;

}

actualizarReloj();

}

// ---------- EVENTOS ----------

document.addEventListener("input",function(e){

if(

e.target.id==="horaDormir"||

e.target.id==="minutoDormir"||

e.target.id==="horaDespertar"||

e.target.id==="minutoDespertar"

){

sincronizarHoraManual();

}

});

// ---------- MODO DESARROLLADOR ----------

let contadorLogo=0;

const logo=document.querySelector(".logo");

if(logo){

logo.addEventListener("click",function(){

contadorLogo++;

if(contadorLogo>=7){

contadorLogo=0;

abrirModoDesarrollador();

}

});

}

function abrirModoDesarrollador(){

alert(

"Modo desarrollador activado.\n\nMás adelante aparecerá un panel especial para las simulaciones."

);

  }
// ---------- RELOJ INDEPENDIENTE ----------

function obtenerAgujas(){

if(relojActivo==="dormir"){

return{

hora:document.getElementById("horaHandDormir"),

minuto:document.getElementById("minutoHandDormir")

};

}

return{

hora:document.getElementById("horaHandDespertar"),

minuto:document.getElementById("minutoHandDespertar")

};

}

function actualizarReloj(){

const agujas=obtenerAgujas();

if(!agujas.hora||!agujas.minuto){

return;

}

let h=0;

let m=0;

if(relojActivo==="dormir"){

h=horaDormir??22;

m=minutoDormir??0;

}else{

h=horaDespertar??6;

m=minutoDespertar??0;

}

const anguloHora=(h%12)*30+(m*0.5);

const anguloMinuto=m*6;

agujas.hora.style.transform=

"translateX(-50%) rotate("+anguloHora+"deg)";

agujas.minuto.style.transform=

"translateX(-50%) rotate("+anguloMinuto+"deg)";

}

// ---------- SINCRONIZACIÓN ----------

function actualizarInputs(){

if(relojActivo==="dormir"){

document.getElementById("horaDormir").value=horaDormir??22;

document.getElementById("minutoDormir").value=minutoDormir??0;

}else{

document.getElementById("horaDespertar").value=horaDespertar??6;

document.getElementById("minutoDespertar").value=minutoDespertar??0;

}

}

function refrescarReloj(){

actualizarInputs();

actualizarReloj();

}

// ---------- PANEL DESARROLLADOR ----------

let modoDev=false;

function abrirModoDesarrollador(){

modoDev=!modoDev;

if(modoDev){

alert(

"Modo desarrollador activado."

);

}else{

alert(

"Modo desarrollador desactivado."

);

}

}
// ---------- PANEL DESARROLLADOR ----------

function ejecutarSimulacion(tipo){

switch(tipo){

case "15":

simular15Minutos();

break;

case "cumplido":

simularCumplimiento();

break;

case "fallo":

simularIncumplimiento();

break;

case "nuevo":

simularNuevoDia();

break;

case "limite":

simularHoraLimite();

break;

}

}

// ---------- RANKING ----------

const rankingBase=[

["Juan Pérez",99],

["María González",95],

["Lucas Fernández",91],

["Sofía Rodríguez",87],

["Mateo López",84],

["Valentina Romero",80],

["Benjamín Torres",76],

["Emma Díaz",72],

["Joaquín Castro",68],

["Martina Ruiz",64],

["Tomás Herrera",60],

["Camila Morales",56],

["Thiago Vega",52],

["Julieta Silva",48],

["Franco Acosta",44]

];

function generarRanking(){

const lista=document.getElementById("rankingLista");

if(!lista){

return;

}

lista.innerHTML="";

rankingBase.forEach(function(usuario,index){

const item=document.createElement("div");

item.className="rankingItem";

item.innerHTML=

"<span>"+

(index+1)+

". "+

usuario[0]+

"</span><strong>"+

usuario[1]+

" 🔥</strong>";

lista.appendChild(item);

});

const separador=document.createElement("hr");

lista.appendChild(separador);

const tuLugar=document.createElement("div");

tuLugar.className="rankingItem you";

tuLugar.innerHTML=

"<span>Tú</span><strong>"+

racha+

" 🔥</strong>";

lista.appendChild(tuLugar);

}

// ---------- CONTACTOS ----------

const contactos=[

"Mamá",

"Papá",

"Hermano",

"Hermana",

"Abuela",

"Abuelo",

"Tío",

"Tía",

"Amigo 1",

"Amigo 2",

"Amigo 3",

"Amigo 4"

];

function cargarContactos(){

const lista=document.getElementById("listaContactos");

if(!lista){

return;

}

lista.innerHTML="";

contactos.forEach(function(nombre){

const item=document.createElement("div");

item.className="contactItem";

item.innerHTML=

"<span>"+

nombre+

"</span><input type='checkbox' checked>";

lista.appendChild(item);

});

}
// ---------- COMPROBACIÓN AUTOMÁTICA ----------

let estadoHoy="pendiente";

function comprobarHorario(){

if(horaDormir===null||horaDespertar===null){

return;

}

const ahora=new Date();

const minutosActuales=

ahora.getHours()*60+

ahora.getMinutes();

let inicioBloqueo=

horaDormir*60+

minutoDormir-

120;

if(inicioBloqueo<0){

inicioBloqueo+=1440;

}

let finBloqueo=

horaDespertar*60+

minutoDespertar;

if(finBloqueo<=inicioBloqueo){

finBloqueo+=1440;

}

let actual=minutosActuales;

if(actual<inicioBloqueo){

actual+=1440;

}

if(

actual>=inicioBloqueo&&

actual<=finBloqueo

){

estadoHoy="bloqueo";

}else{

estadoHoy="libre";

}

}

// ---------- NOTIFICACIÓN 15 MIN ----------

function revisarAviso15Min(){

if(horaDormir===null){

return;

}

const ahora=new Date();

const actual=

ahora.getHours()*60+

ahora.getMinutes();

let aviso=

horaDormir*60+

minutoDormir-

135;

if(aviso<0){

aviso+=1440;

}

if(actual===aviso){

mostrarNotificacion();

}

}

// ---------- ACTUALIZACIÓN ----------

setInterval(function(){

comprobarHorario();

revisarAviso15Min();

},60000);

// ---------- INICIO ----------

window.addEventListener("load",function(){

generarRanking();

cargarContactos();

comprobarHorario();

revisarAviso15Min();

});

// ---------- UTILIDAD ----------

function obtenerEstadoActual(){

return estadoHoy;

   }
// ---------- PANEL DESARROLLADOR ----------

function crearPanelDesarrollador(){

if(document.getElementById("devPanel")){

return;

}

const panel=document.createElement("div");

panel.id="devPanel";

panel.className="modal";

panel.innerHTML=`

<div class="modalContent">

<h2>Modo desarrollador</h2>

<p class="modalDescription">

Herramientas para demostrar la aplicación.

</p>

<button class="primary" onclick="simular15Minutos()">

⏰ Simular aviso de 15 minutos

</button>

<button class="primary" onclick="simularHoraLimite()">

🌙 Simular hora límite

</button>

<button class="primary" onclick="simularCumplimiento()">

🔥 Simular día completado

</button>

<button class="primary" onclick="simularIncumplimiento()">

❌ Simular romper la racha

</button>

<button class="primary" onclick="simularNuevoDia()">

🌅 Simular nuevo día

</button>

<button class="secondary" onclick="reiniciarAplicacion()">

🗑 Reiniciar aplicación

</button>

<button class="secondary" onclick="cerrarPanelDev()">

Cerrar

</button>

</div>

`;

document.body.appendChild(panel);

}

function mostrarPanelDev(){

crearPanelDesarrollador();

document.getElementById("devPanel").classList.add("active");

}

function cerrarPanelDev(){

const panel=document.getElementById("devPanel");

if(panel){

panel.classList.remove("active");

}

}

function abrirModoDesarrollador(){

modoDev=!modoDev;

if(modoDev){

mostrarPanelDev();

}else{

cerrarPanelDev();

}

}
// ---------- INICIALIZACIÓN FINAL ----------

function iniciarAplicacion(){

cargarDatos();

actualizarHorario();

actualizarRacha();

generarRanking();

cargarContactos();

if(horaDormir!==null){

const hDormir=document.getElementById("horaDormir");

const mDormir=document.getElementById("minutoDormir");

if(hDormir&&mDormir){

hDormir.value=horaDormir;

mDormir.value=minutoDormir;

}

}

if(horaDespertar!==null){

const hDespertar=document.getElementById("horaDespertar");

const mDespertar=document.getElementById("minutoDespertar");

if(hDespertar&&mDespertar){

hDespertar.value=horaDespertar;

mDespertar.value=minutoDespertar;

}

}

}

// ---------- ATAJOS ----------

document.addEventListener("keydown",function(e){

if(e.key==="Escape"){

cerrarDormir();

cerrarDespertar();

cerrarContactos();

cerrarRanking();

cerrarPanelDev();

}

});

// ---------- CERRAR MODALES ----------

document.querySelectorAll(".modal").forEach(function(modal){

modal.addEventListener("click",function(e){

if(e.target===modal){

modal.classList.remove("active");

}

});

});

// ---------- CARGA ----------

window.addEventListener("load",function(){

iniciarAplicacion();

});

// ---------- FIN DEL SCRIPT ----------

console.log("Quiet iniciado correctamente.");
// =====================================================
// CIERRE DEL PROYECTO
// =====================================================

// Registrar Service Worker (PWA)

if("serviceWorker" in navigator){

window.addEventListener("load",async()=>{

try{

await navigator.serviceWorker.register("./service-worker.js");

console.log("Service Worker registrado correctamente.");

}catch(error){

console.error("No se pudo registrar el Service Worker:",error);

}

});

}

// ---------- CERRAR NOTIFICACIÓN AUTOMÁTICAMENTE ----------

function mostrarNotificacion(){

notification.classList.remove("oculto");

notification.classList.add("active");

setTimeout(function(){

cerrarNotificacion();

},5000);

}

// ---------- UTILIDAD ----------

function cerrarTodosLosModales(){

cerrarDormir();

cerrarDespertar();

cerrarContactos();

cerrarRanking();

cerrarPanelDev();

}

// ---------- VERSIÓN ----------

const QUIET_VERSION="1.0.0";

console.log("Quiet v"+QUIET_VERSION);

// =====================================================
// FIN DE SCRIPT.JS
// =====================================================
