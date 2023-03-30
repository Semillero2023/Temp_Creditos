//Boton para ver si es un Abend o un File Status, activandose o desactivandose dependiendo del caso
document.querySelector('#FileStatus').addEventListener('click',EncenderFileStatus,(event)=>{
    event.preventDefault();
});
document.querySelector('#Abend').addEventListener('click',EncenderAbend,(event)=>{
    event.preventDefault();
});
var FileStatus = document.getElementById('numero-del-error-FS');
var Abend = document.getElementById('numero-del-error-AB');
//Activa o desactiva los campos dependiendo de que boton está seleccionado
function EncenderFileStatus (){    
    if (FileStatus.disabled){
        FileStatus.disabled = false;
        Abend.disabled = true;
        Abend.value = null;
    }
}
function EncenderAbend (){
    if (Abend.disabled){
        FileStatus.disabled = true;
        Abend.disabled = false;
        FileStatus.value = null;
    }
}



//Aceptar el formulario
document.querySelector('#Formulario').addEventListener('click',GuardarSolucion,(event)=>{
    event.preventDefault();
});
//Enviar a crear los datos
function GuardarSolucion (){
    //Valida si se ha ingresado un ABEND o un FILESTATUS
    if (FileStatus.value.toString().length > 0 ){
         var CodigoError = "File Status " + FileStatus.value.toString();
    } 
    else if (Abend.value.toString().length > 0 ){
         var CodigoError = "Abend " + Abend.value.toString();
    }
    //Acepta los valores escritos en los campos
    var nombre = document.querySelector("#nombre-del-error").value,
        numero = CodigoError,
        id = document.querySelector("#ID-del-error").value,
        complejidad = document.querySelector("#complejidad-del-error").value,
        usuario = document.querySelector("#usuario-del-error").value,
        fecha = document.querySelector("#fecha-del-error").value,
        esperado = document.querySelector("#resultado-esperado-del-error").value,
        obtenido = document.querySelector("#resultado-obtenido-del-error").value,
        descripcion = document.querySelector("#descripcion-del-error").value,
        solucion = document.querySelector("#solucion-del-error").value,
        fuentes = document.querySelector("#fuentes-del-error").value;
    //Manda a crear un nuevo objeto, llamando a la funcion en el otro Js
    AgregarRegistro(nombre,numero,id,complejidad,usuario,fecha,esperado,obtenido,descripcion,solucion,fuentes);
    //Agrega las pestañas
    MostrarSoluciones();
    //Ventana emergente
    swal("EXITO!", "Se ha cargado el nuevo registro en la biblioteca, muchas gracias por tu aporte :D", "");
}

//Imprimir el contenido de datos
function MostrarSoluciones () {
    //Obtener listado de soluciones
    var ListadoSoluciones2 = RetornarSoluciones (),
    //Seleccionar la porcion de html que se desea actualizar
    TarjetaSolucion = document.getElementById("Tarjeta-solucion");
    //Limpiar todo antes de agregar
    TarjetaSolucion.innerHTML = "";
    //Recorre todos los elementos del arreglo y crea tarjetas parra cada uno de ellos
    ListadoSoluciones2.map((x) => {
        //Se inserta HTML, se deera usar comillas invertidas
        TarjetaSolucion.innerHTML += `
      
      <div class="card border-secondary mb-3" header bg-secondary>
        <div class="card-header bg-secondary">
        <h5 class="card-title">${x["ID del mensaje de error"]} ${x["Nombre del error"]}</h5> 
        </div>
        <div class="card-body">
            <h5 class="card-title">Codigo del error: ${x["Codigo de retorno"]}</h5>
            <p class="card-text">Nivel de complejidad: ${x["Complejidad"]}</p>
            <h5 class="card-title">Descripcion del error: ${x["Descripcion del error"]}</h5>
            <p class="card-text">Reportado por: ${x["Reportado por"]}</p>
        </div>
        <img src="..." class="card-img-bottom" alt="${x["Nombre del error"]}">
      </div>

        `;
      console.log(ListadoSoluciones2);
    })
}