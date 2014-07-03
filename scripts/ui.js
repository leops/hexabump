$('#newGame').click(initGame);
$("#restart").click(restartGame);

function timeFormat(time) {
	var date = new Date(time);
	return date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
}

function title() {
	$('.container').addClass('show').find('#ui').removeClass('result').addClass('title');
	FB.api('/me/scores', 'GET', function(response){
		$('#title').find('span').html(timeFormat(response.data[0].score));
	});
}

function result(time) {
	$("#result").find("span").html(timeFormat(time));
	$('.container').addClass('show').find('#ui').addClass("result").removeClass('title');
	sendScore(time, function (response) {
		if (response.error) {
			console.error('sendScore failed', response);
		} else {
			console.log('sendScore succeeded', response);
		}
	});
}