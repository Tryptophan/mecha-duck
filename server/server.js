var io = require('socket.io')();

var speed, angle = 0;

var driver = null;

io.on('connection', function(client) {
  client.on('speed', function(data) {
    speed = data;

    if (driver) {
      io.to(driver).emit('speed', speed);
    }
  });
  client.on('angle', function(data) {
    angle = data;

    if (driver) {
      io.to(driver).emit('angle', angle);
    }
  });

  client.on('driver', function(data) {
    driver = data;
  });
});
io.listen(8080);