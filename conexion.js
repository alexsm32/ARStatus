var sys = require('util'),
    exec = require('child_process').exec;
var connectCounter = 0;
var mem = require('./memoria.js');
var temp = require('./temperatura.js');
var cpu = require('./procesador.js');
var proces = require('./procesos.js');
var info = require('./informacion.js');
var netw = require('./network.js');
var logs = require('./logs.js');
var coman = require('./comandos.js');
var disk = require('./disco.js');
var pm2 = require('./pm2.js');


function login (socket) {
  var pasword = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
  var numPass =  Math.round(Math.random()*3);
  socket.emit('pista', numPass+1);
  return pasword[numPass];
}

function inicio (io) {
  // En cada conexion
  io.of('/moni').on('connection', function(socket) {
  var address = socket.handshake.address;

  console.log("Nueva conexion de " + address.address + ":" + address.port);
  connectCounter++;
  console.log("NUMERO DE CONEXIONES++: " + connectCounter);
  // En cada desconexion
  socket.on('disconnect', function() {
    info.killInt();
    mem.killInt();
    netw.killInt();
    cpu.killInt();
    proces.killInt();
    temp.killInt();
    disk.killInt();
    connectCounter--;  console.log("NUMERO DE CONEXIONES--: " + connectCounter);});

  // Hostname
  info.getHostname(socket, exec);
  // Kernel
  info.getKernel(socket, exec);
  // Uptime
  info.getUptime(socket, exec);
  // Users
  info.getUsers(socket, exec);
  //Discos
  disk.getDisks(socket, exec);
  //Netstat
  netw.getPorts(socket, exec);
  // TopList
  proces.getProcess(socket, exec);
  // Memoria total
  mem.getMem(socket, exec);
  // Memoria en uso
  //mem.getUsedMem(socket, exec);
  // CPU
  cpu.getUsage(socket, exec);
  // Temperatura
  temp.getTemp(socket, exec);
  // Uptime setinterval
  // TOP list setinterval
});

io.of('/control').on('connection', function(socket) {
    var address = socket.handshake.address;
    var getLogin = login(socket);

  socket.on('pass', function (pass) {
    if (getLogin == pass) {
      clearTimeout(timeOut);
      console.log("Nueva conexion de " + address.address + ":" + address.port);
      connectCounter++;
      console.log("NUMERO DE CONEXIONES++: " + connectCounter);
      socket.on('disconnect', function() {
        pm2.killInt();
        connectCounter--;  console.log("NUMERO DE CONEXIONES--: " + connectCounter);});

      logs.sendLogs(socket, exec);
      coman.powerManager(socket, exec);
      coman.mySQL(socket, exec);
      coman.openVPN(socket, exec);
      coman.apache(socket, exec);
      coman.sshd(socket, exec);
      coman.vnc(socket, exec);
      coman.trans(socket, exec);
      coman.samba(socket, exec);
      coman.vsftp(socket, exec);
      coman.minidlna(socket, exec);
      pm2.getInfo(socket, exec);
      //Encontrar la forma de eliminar el event listener 'pass'
    }
    else {
      clearTimeout(timeOut);
      //en un futuro se guardara un log
      console.log('cerrando socket');
      socket.disconnect();
    }
  });

   var timeOut = setTimeout(function () {
    console.log('Timeout')
     socket.disconnect();
   }, 30000);


  });

}

exports.inicio = inicio;
