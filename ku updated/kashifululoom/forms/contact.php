<?php
if(isset($_POST['esubmit'])){

}
$to = 'muhammadsaad03434@gmail.com';
$name = $_POST['name'];
$phone = $_POST['phone'];
$familyPhone = $_POST['family-phone'];
$education = $_POST['education'];
$age = $_POST['age'];
$income = $_POST['income'];
$subject = $_POST['subject'];
$address = $_POST['address'];
$message = $_POST['message'];
$from = $_POST['email'];
$headers = 'From : $from';

mail($to, $name, $phone, $familyPhone, $education, $age, $income, $subject, $address, $message, $headers);
echo 'Your message has been sent succefuuly, our team reply you ASAP.';
?>

<?php
if(isset($_POST['esubmit'])){
  $name = $_POST['name'];
  $email = 'email';
  $phone = $_POST['phone'];
  $familyPhone = $_POST['family-phone'];
  $education = $_POST['education'];
  $age = $_POST['age'];
  $income = $_POST['income'];
  $subject = $_POST['subject'];
  $address = $_POST['address'];
  $message = $_POST['message'];
  $fromName="Kashiful uloom";
  $fromEmail = 'saadtaskin226@gmail.com';
  $ReplyTo = $email;
  $toemail = 'muhammadsaad03434@gmail.com';
  $headers = 'From : $from';
  $message= 'Name:-'.$name.'<br> Email:-'.$email.'<br> Phone:-'.$phone.'<br> Family Phone:-'.$familyPhone.'<br> Education:-'.$education.'<br> Age:-'.$income.'<br> Subject:-'.$subject.'<br> Address:-'.$address;

  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=iso-8859-1\n";
  $headers  = "From: ".$fromName." <".$fromEmail.">\n";
  $headers  = "Reply To: ".$ReplyTo."\n";
  $headers .= "Cc: testsite <mail@testsite.com>\n"; 
  $headers .= "X-Sender: <".$fromEmail.">\n";
  $headers .= 'X-Mailer: PHP/' . phpversion();
  $headers .= "X-Priority: 1\n"; // Urgent message!
  $headers .= "Return-Path: <".$fromEmail.">\n"; // Return path for errors
  mail($to, $name, $phone, $familyPhone, $education, $age, $income, $subject, $address, $message, $headers);
}



echo 'Your message has been sent succefuuly, our team reply you ASAP.';
?>
