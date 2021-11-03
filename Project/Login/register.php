<? php

require_once "config.php";
require_once "session.php";

if(isset($_POST['username'])){


$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];




$sql = "INSERT INTO user_table ('username', 'pass_word', 'email') VALUES ('$username', '$password', '$email')";

mysqli_query($link, $sql);
}

?>