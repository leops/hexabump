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
	$query->execute(array(':id' => $_GET['id']));
	$achievement = $query->fetch(PDO::FETCH_ASSOC); ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#">
	<head>
		<title><?php echo $achievement['title']; ?></title>
		<meta property="og:type" content="game.achievement"/>
		<meta property="og:url" content="<?php echo AppInfo::getUrl('/achievement.php'); ?>"/>
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
<?php
} catch (PDOException $e) {
	print "Error: " . $e->getMessage();
	die();
}
