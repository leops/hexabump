function login(callback) {
	FB.login(callback, {
		scope: 'user_friends,publish_actions',
		return_scopes: true
	});
}

function loginCallback(response) {
	console.log('loginCallback', response);
	if (response.status != 'connected') {
		top.location.href = 'https://www.facebook.com/appcenter/hexabump';
	}
}

function onStatusChange(response) {
	console.log('onStatusChange', response);
	if (response.status != 'connected') {
		login(loginCallback);
	} else {
		title();
	}
}

function onAuthResponseChange(response) {
	console.log('onAuthResponseChange', response);
}

function sendScore(score, callback) {
	FB.api('/me/scores/', 'post', {
		score: score
	}, function (response) {
		callback(response);
	});
}

function publishAchievement(id) {
	FB.api(
		"/me/achievements",
		"POST",
		{
			"achievement": "http://hexabump.herokuapp.com/achievement.php?id=" + id
		},
		function (response) {
			console.log('publishAchievement', response);
		}
	);
}

function getAchievements(callback) {
	FB.api(
		"/me/achievements",
		{fields: 'data'},
		function (response) {
			if (response && !response.error) {
				callback(response);
			} else {
				console.error('getAchievements', response);
			}
		}
	);
}

function getHighscores(callback) {
	FB.api(
		"/" + $("meta[property='fb:app_id']").attr('content') + "/scores",
		{fields: 'score,user.fields(name,picture.width(120).height(120))'},
		function (response) {
			if (response && !response.error) {
				callback(response);
			} else {
				console.error('getHighscores', response);
			}
		}
	);
}

function shareScore(score, callback) {
	FB.ui({ method: 'share_open_graph',
		   "action_type": "hexabump:score",
		   "action_properties": JSON.stringify({score: score})
	}, callback);
}

window.fbAsyncInit = function() {
	FB.init({
		appId: $("meta[property='fb:app_id']").attr('content'),
		channelUrl: '//' + location.host + '/channel.html',
		status: true,
		cookie: true,
		xfbml: true
	});
	FB.Event.subscribe('auth.authResponseChange', onAuthResponseChange);
	FB.Event.subscribe('auth.statusChange', onStatusChange);
	FB.Event.subscribe('auth.login', function(response) {
		console.log('auth.login', response);
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
