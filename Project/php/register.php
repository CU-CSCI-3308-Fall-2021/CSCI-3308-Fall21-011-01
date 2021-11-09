<? php

require_once "config.php";
require_once "session.php";

if(isset($_POST['submitbutton'])){

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $taken = mysqli_query($link, "SELECT * FROM user_table WHERE username='{username}'");
    if(mysqli_num_rows($taken) == 0){

        $sql = "INSERT INTO user_table ('username', 'pass_word', 'email') VALUES ('$username', '$password', '$email')";

        mysqli_query($link, $sql);

    }else{

        $error_msg = 'Username taken';

    }

}

?>