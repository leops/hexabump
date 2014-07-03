function makeRenderer(world) {
	var elem = document.querySelector('.container'),
		two = new Two({
			width: 1170,
			height: 500,
			type: Two.Types.webgl
		}).appendTo(elem);

	var ball, brick = two.makePolygon(-15, -25, 15, -25, 30, 0, 15, 25, -15, 25, -30, 0, false), bricks = {};

	brick.stroke = '#008fd2';
	brick.linewidth = 1.5;
	brick.fill = '#282828';
	brick.remove();

	world.on('add:body', function(data) {
		var body = data.body;
		if(body.treatment === "dynamic" && body.radius) {
			ball = two.makeCircle(0, 0, 1);
			ball.fill = '#718a01';
			ball.linewidth = 0;
		} else if(body.treatment == "static") {
			bricks[body.uid] = brick.clone();
			bricks[body.uid].translation.set(body.state.pos.x, body.state.pos.y);
			two.add(bricks[body.uid]);
		}
	});

	world.on('remove:body', function(data) {
		var body = data.body;
		if(bricks[body.uid])
			bricks[body.uid].remove();
	});

	return two.bind('update', function(frameCount) {
		world.step(performance.now() + world.timestep());
		world._bodies.forEach(function(body){
			if(body.treatment === "dynamic" && body.radius) {
				if (body.radius < 10)
					ball.fill = '#a42a3c';
				else
					ball.fill = '#718a01';

				ball.scale = body.radius;
				ball.translation.set(body.state.pos.x, body.state.pos.y);
			}
		});
	}).play();
}
