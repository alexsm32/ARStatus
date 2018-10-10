var child, iCPU;

function getUsage (socket, exec) {
	iCPU = setInterval(function(){
    child = exec("top -d 0.5 -b -n2 | grep 'Cpu(s)'| tail -n 1 | awk '{print $2 + $4}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //Es necesario mandar el tiempo (eje X) y un valor de temperatura (eje Y).
      var date = new Date().getTime();
      socket.emit('cpuUsageUpdate', date, parseFloat(stdout)); 
    }
  });}, 10000); 
}

function killInt () {
  clearInterval(iCPU);
}

exports.getUsage = getUsage;
exports.killInt = killInt;