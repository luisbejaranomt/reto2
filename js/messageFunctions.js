var urlMessage = 'https://g88ed2e9dd645da-reto.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message';
function getMessages(){  //Funcion Get
        $.ajax({    
            url : urlMessage,
            type : 'GET',
            dataType : 'json',
    
            success : function(Messages) {
                   let cs = Messages.items;
                   $("#listMessages").empty();

                   let k = ""
                   k += "<table class='tb'>";
                   k += "<tr>";
                   k += "<th>" + "Id" + "</th>";
                   k += "<th>" + "Mensaje" + "</th>";
                   k += "</tr>";
                   for(i=0;i<cs.length;i++){
                        k += "<tr>";
                        k += "<td>" + cs[i].id + "</td>";
                        k += "<td>" + cs[i].messagetext + "</td>";
                        k += "<td>" + "<button onclick='getDetailMessage("+cs[i].id+")'>Actualizar</button> " + "</td>";
                        k += "<td>" + "<button onclick='deleteMessage("+cs[i].id+")'>Eliminar</button><br>" + "</td>";
                        k += "</tr>";

//                        $("#listMessages").append(k);
                   }
                   k += "</table>";
                   $("#listMessages").append(k);

            },
            error : function(xhr, status) {
                alert('Error al modificar el Mensaje. Revise los datos y/o conexión con el servidor');
            }
        });
    }

    function getDetailMessage(idMessage){ 
        //alert(urlMessage+"/" + idMessage); 

        $.ajax({    
            url : urlMessage + "/" + idMessage,
            type : 'GET',
            dataType : 'json',
    
            success : function(Messages) {
                    let cs = Messages.items;
                    $("#idMessage").val(cs[0].id);
                    $("#messageTextMessage").val(cs[0].messagetext);
            },
            error : function(xhr, status) {
                alert('Error al traer datos del Mensaje');
            }
        });
    }

function saveMessage() {
        let idMessage = $("#idMessage").val();
        let messageTextMessage =$("#messageTextMessage").val();
    
        let data={
            id:idMessage,
            messagetext:messageTextMessage
        };
    
        let dataToSend=JSON.stringify(data);
        console.log(dataToSend);
    
    
        $.ajax({    
            url : urlMessage,
            type : 'POST',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                    $("#idMessage").val("");
                    $("#messageTextMessage").val("");
            },
            error : function(xhr, textStatus, error) {
                   window.alert("Error al crear el Mensaje. Revise los datos y/o conexión con el servidor");
            },
            complete: function(){
                getMessages();
            }
        });

    }

    function updateMessage(){
        let idMessage = $("#idMessage").val();
        let messageTextMessage = $("#messageTextMessage").val();
    
        let data={
            id:idMessage,
            messagetext:messageTextMessage
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urlMessage,
            type : 'PUT',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                $("#idMessage").val("");
                $("#messageTextMessage").val("");
            },
            error : function(xhr, status) {
                alert('Error al actualizar el Mensaje. Revise los datos y/o conexión con el servidor');
            },
            complete: function(){
                getMessages();
            }
        });
    }

    function deleteMessage(idMessage){
        let data={
            id:idMessage
        };
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
        $.ajax({    
            url : urlMessage,
            type : 'DELETE',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function() {
                    $("#idMessage").val("");
                    $("#messageTextMessage").val("");
            },
            error : function(xhr, status) {
                alert('Error al eliminar el Mensaje. Revise los datos y/o conexión con el servidor');
            },
            complete: function(){
                getMessages();
            }
        });
    }