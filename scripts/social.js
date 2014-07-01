function login(callback) {
	FB.login(callback);
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
