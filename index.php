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
	<script type="text/javascript">
		window.fbAsyncInit = function() {
			FB.init({
				appId: '<?php echo AppInfo::appID(); ?>',
				channelUrl: '//<?php echo $_SERVER["HTTP_HOST"]; ?>/channel.html',
				status: true,
				cookie: true,
				xfbml: true
			});
			FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
			FB.Event.subscribe('auth.statusChange', onStatusChange);
			FB.Event.subscribe('auth.login', function(response) {
				window.location = window.location;
			});

			FB.Canvas.setAutoGrow();
		};

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>

	<div class="container">
		<h1 class="row">hexabump</h1>
		<div id="result">
			<div>
				<span></span>
				<div class="btn-group">
					<button id="share" type="button" class="btn btn-default">Share</button>
					<button id="restart" type="button" class="btn btn-default">Try again</button>
				</div>
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

	<script src="bower_components/jquery/dist/jquery.js"></script>
	<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
	<script src="bower_components/physicsjs/dist/physicsjs-full-0.6.0.js"></script>
	<script src="bower_components/bootstrap/js/affix.js"></script>
	<script src="bower_components/bootstrap/js/alert.js"></script>
	<script src="bower_components/bootstrap/js/dropdown.js"></script>
	<script src="bower_components/bootstrap/js/tooltip.js"></script>
	<script src="bower_components/bootstrap/js/modal.js"></script>
	<script src="bower_components/bootstrap/js/transition.js"></script>
	<script src="bower_components/bootstrap/js/button.js"></script>
	<script src="bower_components/bootstrap/js/popover.js"></script>
	<script src="bower_components/bootstrap/js/carousel.js"></script>
	<script src="bower_components/bootstrap/js/scrollspy.js"></script>
	<script src="bower_components/bootstrap/js/collapse.js"></script>
	<script src="bower_components/bootstrap/js/tab.js"></script>
	<script src="scripts/main.js"></script>
	<script src="scripts/social.js"></script>
</body>

</html>
