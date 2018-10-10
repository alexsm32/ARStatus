var child, iProcess;

function getProcess (socket, exec) {
	child = exec("top -d 0.5 -b -n1 | tail -n +8 | awk '{print $1 \" \" $12 \" \" $9 \" \" $10}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('toplist', stdout); 
	    }
	  });

	iProcess = setInterval(function(){
    child = exec("top -d 0.5 -b -n1 | tail -n +8 | awk '{print $1 \" \" $12 \" \" $9 \" \" $10}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('toplist', stdout); 
	    }
	  });}, 10000);
}

function killInt () {
  clearInterval(iProcess);
}

exports.getProcess = getProcess;
//exports.getJobs = getJobs;
exports.killInt = killInt;