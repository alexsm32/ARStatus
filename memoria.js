  var iMem, memTotal, memUsed = 0, memFree = 0, memBuffered = 0, memCached = 0, sendData = 1, percentBuffered, percentCached, percentUsed, percentFree, child;


// Memoria total
function getMem (socket, exec) {
    child = exec("egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      memTotal = stdout;
      socket.emit('memoryTotal', stdout); 
    }
  });

	// Intervalo memoria libre, usada, cached y buffered
	iMem = setInterval(function(){
    
    // Memoria buffered
    child = exec("egrep --color 'Buffers' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memBuffered = stdout;
      percentBuffered = Math.round(parseInt(memBuffered)*100/parseInt(memTotal));
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    // Memoria cached
    child = exec("egrep --color 'Cached' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memCached = stdout;
      percentCached = Math.round(parseInt(memCached)*100/parseInt(memTotal));
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    // Memoria libre y usada
    child = exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memFree = stdout;
      memUsed = parseInt(memTotal)-parseInt(memFree)-parseInt(memBuffered)-parseInt(memCached);
      percentUsed = Math.round(parseInt(memUsed)*100/parseInt(memTotal));
      percentFree = Math.round(parseInt(memFree)*100/parseInt(memTotal));
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    // Enviar datos
    if (sendData == 1) {
      socket.emit('memoryUpdate', percentFree, percentUsed, percentBuffered, percentCached); 
    } else {
      sendData = 1;
    }
  }, 5000);
}

function killInt () {
  clearInterval(iMem);
}

exports.getMem = getMem;
//exports.getUsedMem = getUsedMem;
exports.killInt = killInt;