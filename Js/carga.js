//Recibir carga masiva y agregar cada elemento al arreglo de objetos
var selectedFile;
//Cada Hoja de excel se convertirá en un arreglo, este arreglo se guardará aqui
var ArregloCargaMasiva = [];
//Esto acepta el archivo enviado mediante formulario, cuando se envia, se ejcuta el metodo document.getElementById
var FomularioExcel = document.getElementById('Excel')
var input_file = document.getElementById('Excel')
input_file.addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})
//Este metodo se activa cuando se envia el formulario
document.getElementById('EnviarExcel').addEventListener("click", () => {
  //Si el formulario esta correcto, se procede
    if(selectedFile){
      //Usa un File Reader para leer el archivo subido
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         workbook.SheetNames.forEach(sheet => {
          //Manda la hoja como un arreglo, donde la primer fila son las llaves y las demas filas son objetos con el valor de sus
          //celdas
              ArregloCargaMasiva = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
         });
         //Recorre el arreglo y a cda elemento, lo envia al arreglo general de elementos
         ArregloCargaMasiva.map((i) => {
            AgregarRegistro(
              i["Nombre del error"],
              i["Codigo de retorno"],
              i["ID del mensaje de error"],
              i["Complejidad"],
              i["Reportado por"],
              i["Dia del reporte"],
              i["Resultado esperado"],
              i["Resultado obtenido"],
              i["Descripcion del error"],
              i["Solucion implementada"],
              i["Fuentes de consulta"]
              );
         });
         MostrarSoluciones();
         //Ventana emergente
         swal("EXITO!", "Carga masiva realizada correctaente", "");
        }
    }
});