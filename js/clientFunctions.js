var urlClient = 'https://g88ed2e9dd645da-reto.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client';
function getClients(){  //Funcion Get
        $.ajax({    
            url : urlClient,
            type : 'GET',
            dataType : 'json',
    
            success : function(clients) {
                   let cs = clients.items;
                   $("#listClients").empty();

                   let k = ""
                   k += "<table class='tb'>";
                   k += "<tr>";
                   k += "<th>" + "Id" + "</th>";
                   k += "<th>" + "Nombre" + "</th>";
                   k += "<th>" + "Correo" + "</th>";
                   k += "<th>" + "Edad" + "</th>";
                   k += "</tr>";
                   for(i=0;i<cs.length;i++){
                        k += "<tr>";
                        k += "<td>" + cs[i].id + "</td>";
                        k += "<td>" + cs[i].name + "</td>";
                        k += "<td>" + cs[i].email + "</td>";
                        k += "<td>" + cs[i].age + "</td>";
                        k += "<td>" + "<button onclick='getDetailClient("+cs[i].id+")'>Actualizar</button> " + "</td>";
                        k += "<td>" + "<button onclick='deleteClient("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                        k += "</tr>";

//                        $("#listClients").append(k);
                   }
                   k += "</table>";
                   $("#listClients").append(k);

            },
            error : function(xhr, status) {
                alert('Error al modificar el cliente. Revise los datos y/o conexión con el servidor');
            }
        });
    }

    function getDetailClient(idClient){ 
        //alert(urlClient+"/" + idClient); 

        $.ajax({    
            url : urlClient + "/" + idClient,
            type : 'GET',
            dataType : 'json',
    
            success : function(clients) {
                    let cs = clients.items;
                    $("#idClient").val(cs[0].id);
                    $("#nameClient").val(cs[0].name);
                    $("#mailClient").val(cs[0].email);
                    $("#ageClient").val(cs[0].age);
            },
            error : function(xhr, status) {

                alert('Error al traer datos del cliente');
            }
        });
    }

function saveClient() {
        let idClient=$("#idClient").val();
        let nombre=$("#nameClient").val();
        let mailClient=$("#mailClient").val();
        let edad=$("#ageClient").val();
    
        let data={
            id:idClient,
            name:nombre,
            email:mailClient,
            age:edad
        };
    
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
    
    
        $.ajax({    
            url : urlClient,
            type : 'POST',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                    $("#idClient").val("");
                    $("#nameClient").val("");
                    $("#mailClient").val("");
                    $("#ageClient").val("");
            },
            error : function(xhr, textStatus, error) {
                   window.alert("Error al crear el cliente. Revise los datos y/o conexión con el servidor");
            },
            complete: function(){
                getClients();
            }
        });

    }

    function updateClient(){
        let idClient=$("#idClient").val();
        let nombre=$("#nameClient").val();
        let mailClient=$("#mailClient").val();
        let edad=$("#ageClient").val();
    
        let data={
            id:idClient,
            name:nombre,
            email:mailClient,
            age:edad
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urlClient,
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                $("#idClient").val("");
                $("#nameClient").val("");
                $("#mailClient").val("");
                $("#ageClient").val("");
            },
            error : function(xhr, status) {
                alert('Error al actualizar el cliente. Revise los datos y/o conexión con el servidor');
            },
            complete: function(){
                getClients();
            }
        });
    }

    function deleteClient(idClient){
        let data={
            id:idClient
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urlClient,
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                    $("#idClient").val("");
                    $("#nameClient").val("");
                    $("#mailClient").val("");
                    $("#ageClient").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                getClients();
            }
        });
    }