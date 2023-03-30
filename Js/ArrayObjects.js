//Arreglo general de elementos
var ListadoSoluciones = [];
//Funcion agregar registros, sera llamada desde el script principal
function AgregarRegistro (e_nombre,e_numero,e_ID,e_complejidad,
    e_usuario,e_fecha,e_esperado,e_obtenido,e_descripcion,
    e_solucion,e_fuentes) {
    //Se separa el tipo de error del codigo
    var ErrorSeparado = e_numero.toString().split(",");        
    //Se crea un objeto json para guardar el registro nuevo
    var SolucionNueva = {
        "Nombre_Error" :        e_nombre.toString(),
        "Tipo_Error" :          ErrorSeparado[0],
        "Codigo_Retorno" :      ErrorSeparado[1],
        "ID_Mensaje_Error":     e_ID.toString(),
        "Complejidad":          e_complejidad.toString(),
        "Reportado_Por" :       e_usuario.toString(),
        "Fecha" :               e_fecha.toString(),
        "Resultado_Esperado" :  e_esperado.toString(),
        "Resultado_Obtenido" :  e_obtenido.toString(),
        "Descripcion_Error" :   e_descripcion.toString(),
        "Solucion" :            e_solucion.toString(),
        "Fuentes" :             e_fuentes,
        "Utilidad" :            0
    };
    //El registro se agrega al arreglo de soluciones
    ListadoSoluciones.push(SolucionNueva);

    //Imprimir el objeto agregado
    console.log(SolucionNueva);
}
//Retornar el listado de soluciones
function RetornarSoluciones () {
    return ListadoSoluciones;
}