<?php
session_start();

// Recibe los datos del formulario
$productos = $_POST['productos'];
$cantidades = $_POST['cantidades'];
$subtotal = $_POST['subtotal'];
$envio = $_POST['envio'];
$total = $_POST['total'];

// Almacena los datos en variables de sesión
$_SESSION['productos'] = $productos;
$_SESSION['cantidades'] = $cantidades;
$_SESSION['subtotal'] = $subtotal;
$_SESSION['envio'] = $envio;
$_SESSION['total'] = $total;

?>