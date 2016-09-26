<!DOCTYPE html>
<!-- <html> -->
<!-- <head> -->
<!-- <meta charset="UTF-8"> -->
<!-- <title>PHP测试</title> -->
<!-- </head> -->
<!-- <body> -->
<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:POST,GET");
//echo($_GET['userName']);
echo("用户名:" . $_POST['userName'] . ";" . "密码:" . $_POST['password0']);
?>
<!-- </body> -->
<!-- </html> -->


