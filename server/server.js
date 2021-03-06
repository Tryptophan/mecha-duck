var io = require('socket.io')();

var speed, angle = 0;

var pickupPackage, dropoffPackage, eatLeft, eatRight = false;
var forward = true;
var x = 0;
var y = 100;

io.on('connection', client => {

  client.on('speed', data => {
    speed = data;
    client.broadcast.emit('speed', data);
  });
  client.on('angle', data => {
    angle = data;
    client.broadcast.emit('angle', data);
  });
  client.on('pickup', data => {
    pickupPackage = data;
    client.broadcast.emit('pickup', data);
  });
  client.on('dropoff', data => {
    dropoffPackage = data;
    client.broadcast.emit('dropoff', data);
  });
  client.on('eatLeft', data => {
    eatLeft = data;
    client.broadcast.emit('eatLeft', data);
  });
  client.on('eatRight', data => {
    eatRight = data;
    client.broadcast.emit('eatRight', data);
  });
  client.on('forward', data => {
    forward = data;
    client.broadcast.emit('forward', data);
  });
  client.on('x', data => {
    x = data;
    client.broadcast.emit('x', data);
  });
  client.on('y', data => {
    y = data;
    client.broadcast.emit('y', data);
  });
});
io.listen(8080);