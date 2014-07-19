$('#newGame').click(initGame);
$("#restart").click(restartGame);
$("#hsBtn").click(highscores);
$("#achBtn").click(achievements);
$(".titleBtn").click(title);

function timeFormat(time) {
	var date = new Date(time);
	return date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
}

function title() {
	$('.container').addClass('show').find('#ui').attr('class', 'title');
	FB.api('/me/scores', 'GET', function (response) {
		$('#title').find('span').html(timeFormat(response.data[0].score));
	});
}

function result(time) {
	if (time > 60000)
		publishAchievement(1);
	$('#shareScore').removeClass('btn-success').removeClass('btn-danger');
	$("#result span").html(timeFormat(time));
	$('.container').addClass('show').find('#ui').attr('class', 'result');
	$('#shareScore').unbind('click').click(function (e) {
		shareScore(Math.round(time), function (res) {
			console.log('shareScore', res);
			if (res && !res.error)
				$('#shareScore').removeClass('btn-danger').addClass('btn-success');
			else
				$('#shareScore').addClass('btn-danger').removeClass('btn-success');
		});
	});
	FB.api('/me/score', function (response) {
		if (response.data && response.data[0] && response.data[0].score < time) {
			$("#result span").tooltip({
				title: 'New highscore!',
				trigger: 'manual'
			}).tooltip('show');
			$('#restart, .titleBtn').one(function () {
				$("#result span").tooltip('destroy');
			})
			sendScore(time, function (response) {
				if (response.error) {
					console.error('sendScore failed', response);
				} else {
					console.log('sendScore succeeded', response);
				}
			});
		} else {
			console.log(response.data, time);
		}
	});
}

function highscores() {
	$('.container').addClass('show').find('#ui').attr('class', 'highscore');
	getHighscores(function (res) {
		$('#highscore tbody').html('');
		res.data.forEach(function (data, index) {
			$('#highscore tbody').append($('<tr><td>' + (index + 1) + '</td><td><img src="' + data.user.picture.data.url + '" alt="Picture"/></td><td>' + data.user.name + '</td><td>' + timeFormat(data.score) + '</td></tr>'));
		});
	});
}

function achievements() {
	$('.container').addClass('show').find('#ui').attr('class', 'achievements');
	getAchievements(function (res) {
		$('#achievements tbody').html('');
		res.data.forEach(function (achieves) {
			var achievement = achieves.data.achievement,
				xhr = new XMLHttpRequest()
				xhr.open('GET', achievement.url.replace('http:', 'https:'), true);
			xhr.onreadystatechange = function (e) {
				if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 && xhr.responseXML) {
					$('#achievements tbody').append($('<tr><td><img height="56px" width="56px" src="' + $(xhr.responseXML).find("meta[property='og:image']").attr('content') + '" alt="Icon"/></td><td>' + $(xhr.responseXML).find("meta[property='og:title']").attr('content') + '</td><td>' + $(xhr.responseXML).find("meta[property='og:description']").attr('content') + '</td><td>' + $(xhr.responseXML).find("meta[property='game:points']").attr('content') + '</td></tr>'));
				}
			};
			xhr.responseType = "document";
			xhr.send(null);
		});
	});
}
