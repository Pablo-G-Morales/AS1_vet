const $submit= document.getElementById("submit"), 
$nombre= document.getElementById("nombre"), 
$edad= document.getElementById("edad"),
$raza= document.getElementById("raza"),
$propietario= document.getElementById("propietario"),
$email= document.getElementById("email"),
$telefono= document.getElementById("telefono"),
$fecha_consulta= document.getElementById("fecha_consulta"),
$observaciones = document.getElementById("observaciones");

document.addEventListener("click",(e) =>{
    if(e.target === $submit){
        if($nombre.value !== "" && $edad.value !== "" && $raza !== "" && $propietario !== "" && $email !== "" && $telefono !== "" && $fecha_consulta !== "" && $observaciones !== ""){
            
          e.preventDefault();
          alert("Tu consulta ha sido añadida correctamente");
          window.location.href = "Registro.html";    
    }
    }
    })