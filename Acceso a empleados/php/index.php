<?php
// Conexión a la base de datos (reemplaza los valores con los de tu configuración)

$host = "localhost"; // Host de la base de datos
$user = "root"; // Nombre de usuario de la base de datos
$pass = ""; // Contraseña de la base de datos
$database = "accesoempleado";//direccion de base de datos
$conn = mysqli_connect($host, $user,$pass, $database); // Establecer la conexión a la base de datos

?>
<?php
if(isset($_POST['iniciar'])){ 
      
    $email = $_POST['email'];
    $password = $_POST['password'];
 
    $insertar = "INSERT INTO iniciarsesion Values ('$email','$password','')";
    $coneccion = mysqli_query($conn,$insertar);
}
?>