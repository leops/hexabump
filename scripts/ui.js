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
	FB.api('/me/scores', 'GET', function(response){
		$('#title').find('span').html(timeFormat(response.data[0].score));
	});
}

function result(time) {
	$('#shareScore').removeClass('btn-success').removeClass('btn-danger');
	$("#result span").html(timeFormat(time));
	$('.container').addClass('show').find('#ui').attr('class', 'result');
	$('#shareScore').unbind('click').click(function(e) {
		shareScore(Math.round(time), function(res) {
			console.log('shareScore', res);
			if(res && !res.error)
				$('#shareScore').removeClass('btn-danger').addClass('btn-success');
			else
				$('#shareScore').addClass('btn-danger').removeClass('btn-success');
		});
	});
	FB.api('/me/scores', function(response) {
		if( response.data && response.data.score < time ) {
			$("#result span").tooltip({
				title: 'New highscore!',
				trigger: 'manual'
			});
			sendScore(time, function (response) {
				if (response.error) {
					console.error('sendScore failed', response);
				} else {
					console.log('sendScore succeeded', response);
				}
			});
		}
	});
}

function highscores() {
	$('.container').addClass('show').find('#ui').attr('class', 'highscore');
	getHighscores(function(res) {
		$('#highscore tbody').html('');
		res.data.forEach(function(data, index) {
			$('#highscore tbody').append($('<tr><td>' + (index + 1) + '</td><td><img src="' + data.user.picture.data.url + '" alt="Picture"/></td><td>' + data.user.name + '</td><td>' + data.score + '</td></tr>'));
		});
	});
}

function achievements() {
	$('.container').addClass('show').find('#ui').attr('class', 'achievements');
	getAchievements(function(res) {
		$('#achievements tbody').html('');
		res.data.forEach(function(achieves) {
			var achievement = achieves.data.achievement;
			$('#achievements tbody').append($('<tr><td></td><td>' + achievement.title + '</td><td></td><td></td></tr>'));
		});
	});
}
