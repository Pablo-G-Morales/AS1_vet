const $submit = document.getElementById("submit"), /*Determinacion de variables por id*/ 
$email = document.getElementById("email"),
$password = document.getElementById("password");

document.addEventListener("click",(e) =>{
if(e.target === $submit){
    if($email.value !== "" && $password.value !== ""){
      e.preventDefault();
      window.location.href = "Inicio.html";    
    }
}
})

