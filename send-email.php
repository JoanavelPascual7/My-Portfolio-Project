<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  $to = "Pascual.Joanavel@gmail.com";
  $subject = "New message from $name";
  $body = "From: $name\nEmail: $email\nMessage:\n$message";

  if (mail($to, $subject, $body)) {
    echo "success";
  } else {
    echo "error";
  }
}
?>
