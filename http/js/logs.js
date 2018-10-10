function callLogs (log) {
	socket.emit('callLogs', log);
}

function getLogs () {
	socket.on('logMess', function (logs) {
		var res = logs.split("\n");
		var result = "";
        for (r in res) {
            if (res[r] != "") { 
                result = "<li>" + res[r] + "</li>" + result;
            }
        }
        document.getElementById("log_mess").innerHTML=result;
	});

	socket.on('logSeg', function (logs) {
		var res = logs.split("\n");
		var result = "";
        for (r in res) {
            if (res[r] != "") { 
                result = "<li>" + res[r] + "</li>" + result;
            }
        }
        document.getElementById("log_seg").innerHTML=result;
	});

	socket.on('logVPN', function (logs) {
		var res = logs.split("\n");
		var result = "";
        for (r in res) {
            if (res[r] != "") { 
                result = "<li>" + res[r] + "</li>" + result;
            }
        }
        document.getElementById("log_vpn").innerHTML=result;
	});

    socket.on('logVSFTP', function (logs) {
        var res = logs.split("\n");
        var result = "";
        for (r in res) {
            if (res[r] != "") { 
                result = "<li>" + res[r] + "</li>" + result;
            }
        }
        document.getElementById("log_vsftp").innerHTML=result;
    });
}