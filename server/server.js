var io = require('socket.io')();

var speed, angle = 0;

io.on('connection', function(client) {

  client.on('speed', function(data) {
    speed = data;

    // if (driver) {
      client.broadcast.emit('speed', speed);
    // }
  });
  client.on('angle', function(data) {
    angle = data;

    // if (driver) {
      client.broadcast.emit('angle', angle);
    // }
  });
});
io.listen(8080);