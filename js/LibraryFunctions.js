var urllibrary = 'https://g88ed2e9dd645da-reto.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/library/library';
function getLibraries(){  //Funcion Get
        $.ajax({    
            url : urllibrary,
            type : 'GET',
            dataType : 'json',
    
            success : function(libraries) {
                   let cs = libraries.items;
                   $("#listLibraries").empty();

                   let k = ""
                   k += "<table class='tb'>";
                   k += "<tr>";
                   k += "<th>" + "Id" + "</th>";
                   k += "<th>" + "Objetivo" + "</th>";
                   k += "<th>" + "Capacidad" + "</th>";
                   k += "<th>" + "Categoría" + "</th>";
                   k += "<th>" + "Nombre" + "</th>";
                   k += "</tr>";
                   for(i=0;i<cs.length;i++){
                        k += "<tr>";
                        k += "<td>" + cs[i].id + "</td>";
                        k += "<td>" + cs[i].target + "</td>";
                        k += "<td>" + cs[i].capacity + "</td>";
                        k += "<td>" + cs[i].category_id + "</td>";
                        k += "<td>" + cs[i].name + "</td>";
                        k += "<td>" + "<button onclick='getDetailLibrary("+cs[i].id+")'>Actualizar</button> " + "</td>";
                        k += "<td>" + "<button onclick='deleteLibrary("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                        k += "</tr>";

//                        $("#listlibraries").append(k);
                   }
                   k += "</table>";
                   $("#listLibraries").append(k);

            },
            error : function(xhr, status) {
                alert('Error al modificar el librarye. Revise los datos y/o conexión con el servidor');
            }
        });
    }

    function getDetailLibrary(idlibrary){ 
        //alert(urllibrary+"/" + idlibrary); 

        $.ajax({    
            url : urllibrary + "/" + idlibrary,
            type : 'GET',
            dataType : 'json',
    
            success : function(libraries) {
                    let cs = libraries.items;
                    $("#idLibrary").val(cs[0].id);
                    $("#targetLibrary").val(cs[0].target);
                    $("#capacityLibrary").val(cs[0].capacity);
                    $("#categoryIdLibrary").val(cs[0].category_id);
                    $("#nameLibrary").val(cs[0].name);                    
            },
            error : function(xhr, status) {
                alert('Error al traer datos del Cubiculo');
            }
        });
    }

function saveLibrary() {
        let idLibrary=$("#idLibrary").val();
        let targetLibrary=$("#targetLibrary").val();
        let capacityLibrary=$("#capacityLibrary").val();
        let categoryIdLibrary=$("#categoryIdLibrary").val();
        let nameLibrary=$("#nameLibrary").val();

    
        let data={
            id:idLibrary,
            target:targetLibrary,
            capacity:capacityLibrary,
            category_id:categoryIdLibrary,
            name:nameLibrary
        };
    
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
    
    
        $.ajax({    
            url : urllibrary,
            type : 'POST',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                    $("#idLibrary").val("");
                    $("#targetLibrary").val("");
                    $("#capacityLibrary").val("");
                    $("#categoryIdLibrary").val("");
                    $("#nameLibrary").val("");
            },
            error : function(xhr, textStatus, error) {
                   window.alert("Error al crear el Cubículo. Revise los datos y/o conexión con el servidor");
            },
            complete: function(){
                getLibraries();
            }
        });

    }

    function updateLibrary(){
        let idLibrary=$("#idLibrary").val();
        let targetLibrary=$("#targetLibrary").val();
        let capacityLibrary=$("#capacityLibrary").val();
        let categoryIdLibrary=$("#categoryIdLibrary").val();
        let nameLibrary=$("#nameLibrary").val();
    
        let data={
            id:idLibrary,
            target:targetLibrary,
            capacity:capacityLibrary,
            category_id:categoryIdLibrary,
            name:nameLibrary
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urllibrary,
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                $("#idLibrary").val("");
                $("#targetLibrary").val("");
                $("#capacityLibrary").val("");
                $("#categoryIdLibrary").val("");
                $("#nameLibrary").val("");
            },
            error : function(xhr, status) {
                alert('Error al actualizar el Cubículo. Revise los datos y/o conexión con el servidor');
            },
            complete: function(){
                getLibraries();
            }
        });
    }

    function deleteLibrary(idlibrary){
        let data={
            id:idlibrary
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urllibrary,
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                $("#idLibrary").val("");
                $("#targetLibrary").val("");
                $("#capacityLibrary").val("");
                $("#categoryIdLibrary").val("");
                $("#nameLibrary").val("");
            },
            error : function(xhr, status) {
                alert('Error al eliminar el Cubículo. Revise los datos y/o conexión con el servidor');
            },
            complete: function(){
                getLibraries();
            }
        });
    }