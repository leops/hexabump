function initGame() {
	$('.container').removeClass('show');
	Physics(function (world) {
		var viewWidth = 1170;
		var viewHeight = 500;

		var renderer = makeRenderer(world);

		var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		world.add(Physics.behavior('edge-collision-detection', {
			aabb: viewportBounds,
			restitution: 1,
			cof: 1
		}));

		window.ball = Physics.body('circle', {
			x: 50,
			y: 30,
			vx: 0.1,
			vy: 0.1,
			radius: 20,
			restitution: 1,
			cof: 1
		});
		world.add(ball);

		for (var i = 33; i + 30 < viewWidth; i += 45) {
			var j;

			if ((i - 33) % 90 == 0) {
				j = 28;
			} else {
				j = 53;
			}

			for (; j + 25 < viewHeight; j += 50) {
				if (Math.random() < 0.4) {
					spawnBrickAt(i, j);
				}
			}
		}

		world.add(Physics.behavior('sweep-prune'));
		world.add(Physics.behavior('body-collision-detection'));
		world.add(Physics.behavior('body-impulse-response'));

		var score = 0;
		world.on('collisions:detected', function (data) {
			var c, radius;
			for (var i = 0, l = data.collisions.length; i < l; i++) {
				c = data.collisions[i];
				radius = ball.radius;
				if (c.bodyA.state.objType == 'brick') {
					world.remove(c.bodyA);
					radius++;
					score++;
				} else if (c.bodyB.state.objType == 'brick') {
					world.remove(c.bodyB);
					radius++;
					score++;
				}

				updateRadius(radius);
			}
		});

		function onKeydown(e) {
			var force = 0.05,
				radius = ball.radius;
			radius--;
			switch (e.keyCode) {
			case 37: // Left
				ball.applyForce({
					x: -force,
					y: 0
				});
				break;
			case 38: // Up
				ball.applyForce({
					x: 0,
					y: -force
				});
				break;
			case 39: // Right
				ball.applyForce({
					x: force,
					y: 0
				});
				break;
			case 40: // Down
				ball.applyForce({
					x: 0,
					y: force
				});
				break;
			default:
				radius++;
				break;
			}
			updateRadius(radius);
		}

		$(document).keydown(onKeydown);

		function updateRadius(radius) {
			if (radius > 0) {
				ball.geometry.radius = ball.radius = radius;
				ball.recalc();
			} else
				endGame();
		}

		var frame = 0,
			deflateInterval = 50,
			spawnInterval = 60 * 4;
		world.on('step', function (data) {
			frame++;
			if (frame % deflateInterval == 0)
				updateRadius(ball.radius - 1);
			if (frame % spawnInterval == 0)
				spawnBrick();
		});

		function buildQuery(x, y) {
			return Physics.query({
				name: 'convex-polygon',
				x: x,
				y: y,
			});
		}

		function spawnBrickAt(x, y) {
			var brick = Physics.body('convex-polygon', {
				treatment: 'static',
				x: x,
				y: y,
				restitution: 1,
				cof: 1,
				vertices: [
					{
						x: -15,
						y: -25
				},
					{
						x: 15,
						y: -25
				},
					{
						x: 30,
						y: 0
				},
					{
						x: 15,
						y: 25
				},
					{
						x: -15,
						y: 25
				},
					{
						x: -30,
						y: 0
				}
			]
			});
			brick.state.objType = 'brick';
			world.add(brick);
		}

		function spawnBrick() {
			var spawned = false;
			while (!spawned) {
				var x = (Math.ceil(Math.random() * ((viewWidth / 45) - 1)) * 45) + 33,
					y = (Math.ceil(Math.random() * ((viewHeight / 50) - 1)) * 50);
				if ((x - 33) % 90 == 0) {
					y += 28;
				} else {
					y += 53;
				}
				var query = world.find(buildQuery(x, y));
				if (query.length == 0) {
					spawnBrickAt(x, y);
					spawned = true;
				}
			}
		}

		var touches = {};
		$(document).on('touchmove', function (e) {
			for (var i in e.touches) {
				var touch = e.touches[i];
				if (touch.pageX && touch.pageY) {
					if (touches[touch.identifier]) {
						touches[touch.identifier].dx = touch.pageX - touches[touch.identifier].x;
						touches[touch.identifier].dy = touch.pageY - touches[touch.identifier].y;
						touches[touch.identifier].x = touch.pageX;
						touches[touch.identifier].y = touch.pageY;
					} else {
						touches[touch.identifier] = {
							x: touch.pageX,
							y: touch.pageY
						};
					}
				}
			}
		}).on('touchend', function (e) {
			for (var i in e.changedTouches) {
				var touch = e.changedTouches[i];
				if (touches[touch.identifier]) {
					ball.applyForce({
						x: Number(touches[touch.identifier].dx > 0) * 0.01,
						y: Number(touches[touch.identifier].dy > 0) * 0.01
					});
					updateRadius(ball.radius - 1);
					console.log(touches[touch.identifier]);
				}
			}
		});

		var startTime = performance.now();

		function endGame() {
			if (renderer.playing) {
				var time = performance.now() - startTime;
				$(document).off('keydown', onKeydown);
				renderer.pause();
				result(time);
			}
		}

	});
}

function restartGame() {
	$("#result span").tooltip('destroy');
	$("canvas").remove();
	initGame();
}
