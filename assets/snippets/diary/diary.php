<?php

include_once '/home/test1.ru/www/assets/snippets/diary/conn.php';
include_once MODX_BASE_PATH.'/assets/snippets/diary/diaryClass.php';

global $modx;
$Diary = new Diary;
$dbprefix = $modx->db->config['table_prefix'];
$Diary->table = $dbprefix."diary";
//$tableDiary = $dbprefix."diary";

$dataBase = 'diary';
$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : null;

$data = $_REQUEST;
$Diary->addDB($dataBase);

switch($type){
	case null : 
	$caption = !isset($data['nav']) ? '<h1>Ежедневник на неделю</h1>' : null;
	echo $Diary->link.$caption.
		'<table class="diary" id="diary" width="100%">
		<tr>
			<th class="day">
			<button class="back"><</button>
			<button class="today">..</button>
			<button class="next">></button></th>
			'.$Diary->week('day', $data['nav']).'
		</tr>
		<tr>
			'.$Diary->week('hourCpt', $data['nav']).'
			'.$Diary->week('hour', $data['nav']).'
		</tr>
		</table>
		<div id="load"></div>';
	break;
	case 'add':
		echo '<script src="assets/snippets/diary/js/diary.js" type="text/javascript"></script>';
		echo '<strong>'.$Diary->addEvent($data['unixhour'], $data['unixday'], 'date') .'</strong>
		
		<form class="event"  method="post" action="/">
		<input type="hidden" class="type" name="type" value="save"/>
		<table>
			<tr>
				<td><span>Начало</span></td><td>'.$Diary->addEvent($data['unixhour'], $data['unixday'], 'start') .'</td>
			</tr>
			<tr>
				<td><span>Конец</span></td><td>'. $Diary->addEvent($data['unixhour'], $data['unixday'], 'end').'</td>
			</tr>
			<tr>
				<td><span>Событие</span></td><td><input type="text" class="title" name="title" value="'.$Diary->addEvent($data['unixhour'], $data['unixday'], 'title').'"/></td>
			</tr>
			<tr>
				<td><span>Описание</span></td><td><textarea class="description" name="description">'.$Diary->addEvent($data['unixhour'], $data['unixday'], 'description').'</textarea></td>
			</tr>
			<tr>
				<td></td><td><input class="submit" type="submit" value="Сохранить"/></td>
			</tr>
		</table>				
		</form>';
	break;
	
	case 'save':
		$Diary->saveEvent($data );
		echo $Diary->link.
		'<h1>Ежедневник на неделю</h1>
		<table class="diary" width="100%">
		<tr >
			<th class="day">
			<button class="back"><</button>
			<button class="today">..</button>
			<button class="next">></button></th>
			'.$Diary->week('day', $data['nav']).'
		</tr>
			'.$Diary->week('hourCpt', $data['nav']).'
			'.$Diary->week('hour', $data['nav']).'
		</tr>
		</table>
		<div id="load"></div>';
	break;
	case 'del':
		$Diary->delEvent($data);
		echo $Diary->link.
		'<h1>Ежедневник на неделю</h1>
		<table class="diary" width="100%">
		<tr >
			<th class="day">
			<button class="back"><</button>
			<button class="today">..</button>
			<button class="next">></button></th>
			'.$Diary->week('day', $data['nav']).'
		</tr>
			'.$Diary->week('hourCpt', $data['nav']).'
			'.$Diary->week('hour', $data['nav']).'
		</tr>
		</table>
		<div id="load"></div>';
	break;
	
}


?>