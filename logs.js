var child;
var fs = require('fs');

function sendLogs (socket, exec) {
	socket.on('callLogs', function (tipo) {
		switch (tipo) {
			case 1:
        /*var lmes = fs.createReadStream("/var/log/messages");
        lmes.setEncoding('UTF8');
        lmes.on('data', (datos) => {
          socket.emit('logMess', datos.toString());
        });*/
				child = exec("tail -n 100 /var/log/messages", function (error, stdout, stderr) {
                  if (error !== null) {
                    console.log('exec error: ' + error);
                  } else {
                    socket.emit('logMess', stdout); 
                  }
                });
				break;
			case 2:
        /*var lsec = fs.createReadStream("/var/log/secure");
        lsec.setEncoding('UTF8');
        lsec.on('data', (datos) => {
          socket.emit('logSeg', datos.toString());
        });*/
				child = exec("tail -n 100 /var/log/secure", function (error, stdout, stderr) {
                  if (error !== null) {
                    console.log('exec error: ' + error);
                  } else {
                    socket.emit('logSeg', stdout); 
                  }
                });
				break;
			case 3:
        /*var lvpn = fs.createReadStream("/var/log/openvpn.log");
        lvpn.setEncoding('UTF8');
        lvpn.on('data', (datos) => {
          socket.emit('logVPN', datos.toString());
        });*/
				child = exec("tail -n 100 /var/log/openvpn.log", function (error, stdout, stderr) {
                  if (error !== null) {
                    console.log('exec error: ' + error);
                  } else {
                    socket.emit('logVPN', stdout); 
                  }
                });
				break;
      case 4:
        child = exec("tail -n 100 /var/log/vsftpd.log", function (error, stdout, stderr) {
                  if (error !== null) {
                    console.log('exec error: ' + error);
                  } else {
                    socket.emit('logVSFTP', stdout); 
                  }
                });
        break;
		}
	});
}

exports.sendLogs = sendLogs;