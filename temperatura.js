var child, iTemp;

function getTemp (socket, exec) {
iTemp = setInterval(function(){
    child = exec("sensors | tail -n 3 | grep Core | awk '{print $3}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //Es necesario mandar el tiempo (eje X) y un valor de temperatura (eje Y).
      var date = new Date().getTime();
      var temp = stdout.split("\n");
      var core1 = parseInt(temp[0]);
      var core2 = parseInt(temp[1]);
      socket.emit('temperatureUpdate', date, core1, core2);
    }
  });}, 5000);
}

function killInt () {
  clearInterval(iTemp);
}

exports.getTemp = getTemp;
exports.killInt = killInt;
