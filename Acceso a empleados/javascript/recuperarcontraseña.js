const $submit = document.getElementById("submit"), /*Determinacion de variables por id*/ 
$email = document.getElementById("email"),
$password = document.getElementById("password"),
$rpassword = document.getElementById("password");

document.addEventListener("click",(e) =>{
    if(e.target === $submit){
        if($email.value !== "" && $password.value !== "" && $rpassword !== ""){
          e.preventDefault();
          alert("Se ha ingresado correctamente la nueva contraseña, muy pronto uno de nuestros operadores se pondrá en contacto");
          window.location.href = "recuperar_contrasena.html";    
        }
    }
    })
  