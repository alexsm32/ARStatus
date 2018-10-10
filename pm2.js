var child, iInfo;

function getInfo (socket, exec) {
	child = exec("pm2 list | grep -E [:alpha:] | head -n -1 | awk '{if (NR>1) print}'", function (error, stdout, stderr) {
			if (error !== null) {
              console.log('exec error: ' + error);
            } else {
              socket.emit('pm2List', stdout); 
            }
		});
	iInfo = setInterval(function () {
		child = exec("pm2 list | grep -E [:alpha:] | head -n -1 | awk '{if (NR>1) print}'", function (error, stdout, stderr) {
			if (error !== null) {
              console.log('exec error: ' + error);
            } else {
              socket.emit('pm2List', stdout); 
            }
		});
	}, 60000);
}

function killInt () {
  clearInterval(iInfo);
}

exports.getInfo = getInfo;
exports.killInt = killInt;