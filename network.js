var child, iPorts;

function getPorts (socket, exec) {
	child = exec("netstat -pnlt | tail -n +3 | awk '{print $1 \" \" $4 \" \" $5 \" \" $6 \" \" $7}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('netstat', stdout); 
	    }
	  });

	iPorts = setInterval(function(){
    child = exec("netstat -pnlt | tail -n +3 | awk '{print $1 \" \" $4 \" \" $5 \" \" $6 \" \" $7}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('netstat', stdout); 
	    }
	  });}, 60000);
}

function killInt () {
  clearInterval(iPorts);
}

exports.getPorts = getPorts;
exports.killInt = killInt;