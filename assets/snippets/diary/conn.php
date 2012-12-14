<?php
//header("Content-Type: text/plain; charset=utf8");
require_once('/home/test1.ru/www/manager/includes/protect.inc.php');
$database_type = "";
$database_server = "";
$database_user = "";
$database_password = "";
$dbase = "";
$table_prefix = "";
$base_url = "";
$base_path = "";

// get the required includes
if($database_user==''){
        if (!$rt = @include_once "/home/test1.ru/www/manager/includes/config.inc.php") {
           exit('Could not load MODx configuration file!');
        }
}
// Установка режима MODx API 
define('MODX_API_MODE', true); 
require_once('/home/test1.ru/www/manager/includes/document.parser.class.inc.php'); 
$modx = new DocumentParser; 
$modx->db->connect(); 
$modx->getSettings();
?>