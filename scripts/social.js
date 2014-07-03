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
		initGame();
	}
}

function onAuthResponseChange(response) {
	console.log('onAuthResponseChange', response);
}

function sendScore(score, callback) {
	FB.api('/me/scores/', 'post', {
		score: score
	}, function (response) {
		if (response.error) {
			console.error('sendScore failed', response);
		} else {
			console.log('sendScore succeeded', response);
		}
		callback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId: document.querySelector("meta[property='fb:app_id']").content,
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
