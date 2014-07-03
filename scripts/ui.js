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
	$("#result").find("span").html(timeFormat(time));
	$('.container').addClass('show').find('#ui').attr('class', 'result');
	sendScore(time, function (response) {
		if (response.error) {
			console.error('sendScore failed', response);
		} else {
			console.log('sendScore succeeded', response);
		}
	});
}

function highscores() {
	$('.container').addClass('show').find('#ui').attr('class', 'highscore');
	getHighscores(function(res) {
		$('#highscore tbody').html('');
		res.data.forEach(function(data, index) {
			$('#highscore tbody').append($('<tr><td>' + index + '</td><td>' + data.user.name + '</td><td>' + data.score + '</td></tr>'));
		});
	});
}

function achievements() {
	$('.container').addClass('show').find('#ui').attr('class', 'achievements');
	getAchievements(function(res) {
		$('#achievements tbody').html('');
		res.data.forEach(function(data) {
			$('#achievements tbody').append($('<tr><td><img src="' + data.image[0].url + '" alt="Icone"/></td><td>' + data.title + '</td><td>' + data.description + '</td><td>' + data.data.points + '</td></tr>'));
		});
	});
}
