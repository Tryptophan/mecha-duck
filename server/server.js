var io = require('socket.io')();

io.on('connection', function(client) {
  client.on('speed', function(speed) {
    console.log(speed);
  });
  client.on('angle', function(angle) {
    console.log(angle);
  });
});
io.listen(8080);