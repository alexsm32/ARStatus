var child, iDisks;

function getDisks (socket, exec) {
  child = exec("df -h | tail -n 2 | awk '{print $1 \" \" $2 \" \" $3 \" \" $4 \" \" $5 \" \" $6}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('discos', stdout);
	    }
	  });

    iDisks = setInterval(function(){
      child = exec("df -h | tail -n 2 | awk '{print $1 \" \" $2 \" \" $3 \" \" $4 \" \" $5 \" \" $6}'", function (error, stdout, stderr) {
  	    if (error !== null) {
  	      console.log('exec error: ' + error);
  	    } else {
  	      socket.emit('discos', stdout);
  	    }
  	  });}, 60000);
}

function killInt () {
  clearInterval(iDisks);
}

exports.getDisks = getDisks;
exports.killInt = killInt;
