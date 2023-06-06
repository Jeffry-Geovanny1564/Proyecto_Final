$(document).ready(function(){  
    // #desactivar-usuarios IDENTIDICADOR DE ID -> ACCION A EJECUTAR
    $(document).on('click', '#desactivar-productos', function(e){
     var IDProductos = $(this).data('id'); // ID ENVIADA POR GET DESDE EL CONTROLADOR HACIA EL MODELO
     DesactivarProducto(IDProductos); // ID UNICO DE USUARIOS
     e.preventDefault();
    });
   });
   function DesactivarProducto(IDProductos){ 
    swal.fire({
        title: '¿Realmente desea desactivar este producto?',
        text: "Al hacer clic en el botón confirmar, este producto no podrá ser ofrecido a los clientes",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EA2027',
        cancelButtonColor: '#5758BB',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
     preConfirm: function() {
       return new Promise(function() {
          $.ajax({
          url: '../controlador/cGestionesCashman.php?cashmanhagestion=desactivar-productos-cashmanha&idproducto='+IDProductos,
          type: 'POST',
             data: 'idproducto='+IDProductos, // COMPARACION PREVIA ANTES DE EJECUTAR ACCION EN SERVIDOR
             dataType: 'json'
          })
          .done(function(respuesta){ // SI MODELO EJECUTA PETICION, REALIZA PETICION
            if(respuesta=="OK"){
                AlertaUsuarioMostrar("Producto Desactivado","Su petición se ha completado con éxito","success");
                 // 1.5 SEGUNDOS DE RETRASO PARA MOSTRAR ALERTA Y REFRESCAR
                 setTimeout(function(){
                    location.reload();
                }, 1500);
            }
          })
          .fail(function(){
            AlertaUsuarioMostrar("Error","Lo sentimos, en estos momentos no podemos procesar tu solicitud, por favor vuelve más tarde...","error");
          });
       });
        },    
    }); 
   }

// FUNCION PARA MOSTRAR ALERTAS A USUARIOS
function AlertaUsuarioMostrar(titulo, descripcion, icono) {
    Swal.fire(
        titulo, // ENCABEZADO 
        descripcion, // CUERPO
        icono // ICONO DE ALERTA
    );
}