$(document).ready(function(){

    //Boton que genera el RFC
    $('#bt1').click(function(){
        var ppat = ($('#appat').val()).charAt(0);
        var pmat = ($('#apmat').val()).charAt(0);

        var t_pat = $('#appat').val().length;
        var t_nom = $('#nom').val().length;

        var arreglo = [];
        var nom = [];
        var indice = 0;
    
        //Arreglo apellido paterno
        for(x=0;x<t_pat;x++){
            arreglo.push($('#appat').val().charAt(x));
        }

        for(y=1;y<t_pat;y++){
            if(arreglo[y] == "a" || arreglo[y] == "e" || arreglo[y] == "i" ||
            arreglo[y] == "o" || arreglo[y] == "u"){
                var vocal = arreglo[y];
                y = t_pat;
            }
        }

        //Arreglo nombre(s)
           for(i=0;i<t_nom;i++){
            if($('#nom').val().charAt(i) == " "){
                indice = i;
            }
        }

        nom.push($('#nom').val().charAt(0));
        nom.push($('#nom').val().charAt(indice + 1));
        nom.sort();
        var pnom = nom[0];

        var fecha = $('#fecha').val();
        var anio = fecha.substr(2,2);
        var mes = fecha.substr(5,2);
        var dia = fecha.substr(8,2);

        //Calculo de homoclave rfc
        var numeros = "0123456789";
        var letras = "abcdefghijklmnopqrstuvwxyz";
        var todo = numeros + letras;
        const generarclave = (longitud) => {
            var clave = " ";

            for(x=0;x<longitud;x++){
                var aleatorio = Math.floor(Math.random()*todo.length);
                clave += todo.charAt(aleatorio);
            }
            return clave;
        }
        //RFC a mostrar, son letras del nombre y apellidos, fecha de nacimiento y 3 digitos asignados por el sat
        $('#rfc').val(ppat + vocal + pmat + pnom + anio + mes + dia + generarclave(3));
        

    });

   //Boton 2 para consultar usuarios del api
    $('#bt2').click(function(){
        
        alert("Consultando :)");
        var x = Math.ceil(Math.random()*10);
        
        $.ajax({
            type: "GET",
            url: "https://jsonplaceholder.typicode.com/users/" + x, 
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus, jqXHR){
                
                $('#nom2').val(data.name);
                $('#email').val(data.email);

                alert("El id del usuario es: " + x);

            },
            failure: function(data){
                alert(data.responseText + "No existe");
            },
            error: function(data){
                alert(data.responseText + "Sin conexion");
            }
        });
    }); 
});