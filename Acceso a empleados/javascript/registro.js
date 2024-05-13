const $submit= document.getElementById("submit"), /*Determinacion de variables por id*/ 
$nombre= document.getElementById("nombre"),
$especie= document.getElementById("especie"),
$raza= document.getElementById("raza"),
$tamaño= document.getElementById("tamaño"),
$fechanacimiento= document.getElementById("fechanacimiento"),
$sexo= document.getElementById("sexo"),
$pelaje= document.getElementById("pelaje"),
$obtencion= document.getElementById("obtencion"),
$esterilizado= document.getElementById("esterilizado"),
$alergias= document.getElementById("alergias"),
$vacuna= document.getElementById("vacuna"),
$discapacidad= document.getElementById("discapacidad"),
$propietario= document.getElementById("propietario"),
$telefono= document.getElementById("telefono"),
$email = document.getElementById("email"),
$dpi= document.getElementById("dpi"),
$residencia = document.getElementById("residencia");

document.addEventListener("click",(e) =>{
    if(e.target === $submit){
        if($nombre.value !== "" && $especie.value !== "" && $raza !== "" && $tamaño !== "" && $fechanacimiento !== "" && $sexo !== "" && $pelaje !== "" && $obtencion !== "" && $esterilizado !== "" && $alergias !== "" && $vacuna !== "" && $discapacidad !== "" && $propietario !== "" && $telefono !== "" && $email !== "" && $dpi !== "" && $residencia !== ""){
            
          e.preventDefault();
          alert("Tu mascota ha sido añadida correctamente");
          window.location.href = "Registro.html";    
    }
    }
    })
