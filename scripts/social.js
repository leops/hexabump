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
			console.log('Score posted to Facebook', response);
		}
		callback(response);
	});
}
