<?php require_once( 'AppInfo.php'); if (substr(AppInfo::getUrl(), 0, 8) !='https://' && $_SERVER[ 'REMOTE_ADDR'] !='127.0.0.1' ) { header( 'Location: https://'. $_SERVER[ 'HTTP_HOST'] . $_SERVER[ 'REQUEST_URI']); exit(); } ?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />
	<title>HexaBump</title>
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
	<link rel="stylesheet" href="styles/main.css">
	<meta property="og:title" content="HexaBump" />
	<meta property="og:type" content="game" />
	<meta property="og:url" content="<?php echo AppInfo::getUrl(); ?>" />
	<meta property="og:image" content="<?php echo AppInfo::getUrl('/logo.png'); ?>" />
	<meta property="og:description" content="Brick breaker with 6 faces" />
	<meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>" />
</head>

<body>
	<div id="fb-root"></div>
	<div class="container show">
		<h1 class="row">hexabump</h1>
		<div id="ui" class="title">
			<div id="result">
				<h2>Time: <span></span></h2>
				<button id="restart" type="button" class="btn btn-default">Try again</button>
			</div>
			<div id="title">
				<button id="newGame" type="button" class="btn btn-primary">New game</button>
				<h2>Highscore: <span></span></h2>
			</div>
		</div>
	</div>
	<script>
		(function(b, o, i, l, e, r) {
			b.GoogleAnalyticsObject = l;
			b[l] || (b[l] =
				function() {
					(b[l].q = b[l].q || []).push(arguments)
				});
			b[l].l = +new Date;
			e = o.createElement(i);
			r = o.getElementsByTagName(i)[0];
			e.src = '//www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e, r)
		}(window, document, 'script', 'ga'));
		ga('create', 'UA-9086978-14');
		ga('send', 'pageview');
	</script>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="bower_components/physicsjs/dist/physicsjs-full-0.6.0.min.js"></script>
	<script src="bower_components/two/build/two.min.js"></script>
	<script src="scripts/render.js"></script>
	<script src="scripts/main.js"></script>
	<script src="scripts/ui.js"></script>
	<script src="scripts/social.js"></script>
</body>

</html>
