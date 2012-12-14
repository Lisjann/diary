<?php
class Diary{
	
	function __construct(){
        global $modx;
		$this->modx = $modx;
	}
	
	var $table;
	
	
	var $link = '<head>
		<link href="assets/snippets/diary/css/style.css" type="text/css" rel="stylesheet">
		<link href="assets/snippets/diary/css/reset.css" type="text/css" rel="stylesheet">
		<link href="assets/snippets/diary/css/jquery.fancybox.css" type="text/css" rel="stylesheet">
		<script src="assets/js/jquery-1.4.4.min.js" type="text/javascript"></script>
		<script src="assets/snippets/diary/js/jquery.fancybox-1.2.1.pack.js" type="text/javascript"></script>
		<script src="assets/snippets/diary/js/diary.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$(".hour a").fancybox({						
					"hideOnContentClick" :false, 
					"centerOnScroll" : false,
					"frameWidth" : 307,
					"frameHeight" : 460,
					"overlayOpacity" : 0.6,
				});
			});
		</script>
		
		</head>';
	
	
	function dayWeek($i){
		switch($i){
			case 0 : $day = 'вс'; break;
			case 1 : $day = 'пн'; break;
			case 2 : $day = 'вт'; break;
			case 3 : $day = 'ср'; break;
			case 4 : $day = 'чт'; break;
			case 5 : $day = 'пт'; break;
			case 6 : $day = 'сб'; break;
		}
		return $day;
	}
	function dataEvent($unix, $type){
		$q = $this->modx->db->select("*", $this->table, 'start <= '.$unix.' && end >='.$unix);
		switch($type){
			case 'count' : 
				$cnt = $this->modx->db->getRecordCount($q);
				return $cnt; 
			break;
			case 'data' :
				$row = $this->modx->db->getRow($q);
				return $row;
			break;
		}
	}	
	
	function week($type, $nav){		
		$list=null;
		$listH=null;
		session_start();
		$_SESSION['nav'];
		switch($nav){
			case 'next': 
				$_SESSION['nav'] = $type == 'day' ? $_SESSION['nav'] - 7 : $_SESSION['nav'];
				$nDay = date("w")+$_SESSION['nav'];
			break; 
			case 'back':
				$_SESSION['nav'] = $type == 'day' ? $_SESSION['nav'] + 7 : $_SESSION['nav'];
				$nDay = date("w")+$_SESSION['nav'];
			break; 
			case 'today': 
				$nDay = date("w");
				$_SESSION['nav'] = 0;
				break; 
			case null: $nDay = date("w")+$_SESSION['nav']; break; 
		}
		
		
		$nHour = date("G");
		for($i=0; $i<=6; $i++){
			$style = $nDay == $i ? 'today' : null;
			$iDay = $i - $nDay;
			$date = date("d.m.y", mktime(0, 0, 0, date("m"), date("d")+$iDay, date("Y")));
			$dateDU = date("U", mktime(0, 0, 0, date("m"), date("d")+$iDay, date("Y")));
			switch($type){
				case 'hour' :
					for($j=0; $j<=23; $j++){
						$dateU = date("U", mktime($j, 0, 0, date("m"), date("d")+$iDay, date("Y")));
						$cnt = $this->dataEvent($dateU, 'count');
						$row = $this->dataEvent($dateU, 'data');
						$active = $cnt > 0 ? 'class="active"' : null;
						
						$valueActive = $cnt > 0  && $row['start'] == $dateU ? '<span>'.$row['title'].'</span><div>'.date("H:i", $row['start']).' - '.date("H:i", $row['end']).'</div><img class="delete" id="'.$dateU.'" src="manager/media/style/MODxCarbon/images/icons/delete.png" title="удалить"/>' : null;
						$listH .='<a href="/?type=add&unixday='.$dateDU.'&unixhour='.$dateU.'" '.$active.'>'.$valueActive.'</a>';
					}
					$list .= '<td class="hour">'.$listH.'</td>';
					$listH = null;
				break;
				case 'hourCpt' :
					if($i == 0){
						for($j=0; $j<=23; $j++){
							$styleH = $nHour == $j ? 'class="tohour"' : null;
							$listH .='<span '.$styleH.'>'.$j.':00</span>';
						}
						$list .= '<td valign="top" class="hourCpt">'.$listH.'</td>';
					}
				break;
				case 'day':
					$list .= '<th class="day '.$style.'">'.$this->dayWeek($i).' '.$date.'</th>';			
				break;
			}
		}
		return $list;
	}
	
	
	function addEvent($unixNHour, $unixNday, $type){
		$cnt = $this->dataEvent($unixNHour, 'count');
		$row = $this->dataEvent($unixNHour, 'data');
		$start = $cnt > 0 ? date('G', $row['start']) : date("G", $unixNHour);
		$end =  $cnt > 0 ? date('G', $row['end']) : $start+1;
		$inp = null;
		$idname = 'class="'.$type.'" name="'.$type;
		
		
		switch($type){
		case 'start' :
			for($i = 0; $i<=23; $i++){
				$sel = $start == $i ? 'selected="selected"' : null;
				$inp .= '<option value="'.$unixNday.'" '.$sel.'>'.$i.':00</option>';
				$unixNday = $unixNday+3600;
			}
			$inp = '<select '.$idname.'">'.$inp.'</select>';
		break;
		case 'end' :
			$unixNday = $unixNday +$end*3600;
			for($i = $end; $i<=23; $i++){
				
				$inp .= '<option value="'.$unixNday.'">'.$i.':00</option>';
				$unixNday = $unixNday+3600;
			}
			$inp = '<select '.$idname.'">'.$inp.'</select>';
		break;
		case 'date' :
			$inp = date("d.m.y", $unixNHour);
		break;
		case 'title' :
			$inp =  $cnt > 0 ? $row['title'] : null;
		break;
		case 'description' :
			$inp =  $cnt > 0 ? $row['description'] : null;
		break;
		}
		return $inp;
	}
	
	function saveEvent($arrSave){
		$title = isset($arrSave[title]) != null ? $arrSave[title] : 'NULL';
		$description = isset($arrSave[description]) != null ? $arrSave[description] : 'NULL';
		$start = isset($arrSave[start]) != null ? $arrSave[start] : 'NULL';
		$end = isset($arrSave[end]) != null ? $arrSave[end] : 'NULL';
		
		$cnt = $this->dataEvent($arrSave[start], 'count');
		$fields = array('title' => $title,
			'description' => $description,
			'start' => $start,
			'end' => $end					
		);
		if($cnt > 0){$this->modx->db->update($fields, $this->table, 'start <= '.$start.' && end >= '.$end );}
		else{$this->modx->db->insert( $fields, $this->table);}
	}
	
	function delEvent($arrSave){
		$this->modx->db->delete($this->table, 'start = '.$arrSave['start']);
	}
	
	function addDB($dbname){
		if ($this->modx->db->getRecordCount($this->modx->db->query("show tables from $dbname like '$this->table'"))==0){
			$this->modx->db->query("CREATE TABLE $this->table (id INT(11) NOT NULL AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(850), start INT(20), end INT(20), PRIMARY KEY (id))");		 
		}
	}

}
?>