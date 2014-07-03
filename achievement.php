<?php require_once( 'AppInfo.php');

function buildDBA($url) {
	$ar = explode('/', $url);
	$url = $ar[2];
	$dbname = $ar[3];
	$ar = explode(':', $url);
	$user = $ar[0];
	$url = $ar[1];
	$port = $ar[2];
	$ar = explode('@', $url);
	$password = $ar[0];
	$host = $ar[1];

	return "pgsql:"
	. "host=" . $host . ";"
	. "dbname=" . $dbname . ";"
	. "user=" . $user . ";"
	. "port=" . $port . ";"
	. "sslmode=require;"
	. "password=" . $password;
}

try {
	$db = new PDO(buildDBA(getenv('DATABASE_URL')));
	$query = $db->prepare("SELECT * FROM achievements WHERE id=:id");
	
	$id = 0;
	if(isset($_GET['id'])) {
		$id = $_GET['id'];
	} else if(isset($_POST['id'])) {
		$id = $_POST['id'];
	} else {
		throw new Exception('Undefined id', 400);
	}
	
	if(gettype($id) != 'integer') {
		throw new Exception('id is not an integer', 400);
	}
	
	$query->execute(array(':id' => $id));
	$achievement = $query->fetch(PDO::FETCH_ASSOC);
	
	if($achievement == FALSE) {
		throw new Exception('This achievement does not exists', 404);
	} else { ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#">
	<head>
		<title><?php echo $achievement['title']; ?></title>
		<meta property="og:type" content="game.achievement"/>
		<meta property="og:url" content="<?php echo AppInfo::getUrl('/achievement.php?id=' . $id); ?>"/>
		<meta property="og:title" content="<?php echo $achievement['title']; ?>"/>
		<meta property="og:description" content="<?php echo $achievement['description']; ?>"/>
		<meta property="og:image" content="<?php echo AppInfo::getUrl($achievement['image']); ?>"/>
		<meta property="game:points" content="<?php echo $achievement['points']; ?>"/>
		<meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>"/>
	</head>
	<body>
		<h1><?php echo $achievement['title']; ?></h1>
		<p><?php echo $achievement['description']; ?></p>
	</body>
</html>
<?php }
	$query->closeCursor();
} catch (Exception $e) {
	$code = $e->getCode();
	if($code == 400 || $code == 404) {
		http_response_code($code);
	} else {
		http_response_code(500);
	}
	print "Error: " . $e->getMessage();
	die();
}
