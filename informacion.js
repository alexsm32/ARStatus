var child, iUptime, iUsers;

function getHostname (socket, exec) {
	child = exec("hostname", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('hostname', stdout); 
    }
  });
}

function getKernel (socket, exec) {
	child = exec("uname -r", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('kernel', stdout); 
    }
  });
}

function getUptime (socket, exec) {
  child = exec("uptime | tr -d ',' | awk '{print \"<p><b>Hora del sistema:</b> \"$1\"</p><p><b>Tiempo encendido:</b> \"$3\"</p>\"}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('uptime', stdout); 
    }
  });

  iUptime = setInterval(function(){
    child = exec("uptime | tr -d ',' | awk '{print \"<p><b>Hora del sistema:</b> \"$1\"</p><p><b>Tiempo encendido:</b> \"$3\"</p>\"}'", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      } else {
        socket.emit('uptime', stdout); 
      }
    });}, 60000);
}

function getUsers (socket, exec) {
  child = exec("who", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('users', stdout); 
    }
  });

  iUsers = setInterval(function(){
    child = exec("who", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      } else {
        socket.emit('users', stdout); 
      }
    });}, 60000);
}

function killInt () {
  clearInterval(iUptime);
  clearInterval(iUsers);
}

exports.getHostname = getHostname;
exports.getKernel = getKernel;
exports.getUptime = getUptime;
exports.getUsers = getUsers;
exports.killInt = killInt;