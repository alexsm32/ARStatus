	function getHostname () {
		socket.on('hostname', function (hname) {
        document.getElementById("p_hostname").innerHTML="<b>Hostname:</b> "+hname;
    	});
	}
	function getKernel () {
		socket.on('kernel', function (ker) {
       	document.getElementById("p_kernel").innerHTML="<b>Kernel:</b> "+ker;
    	}); 
	}
    function getUptime () {
    	socket.on('uptime', function (uptime) {
        document.getElementById("p_uptime").innerHTML= uptime;
    	});
    }
    function getUsers () {
    socket.on('users', function (users) {
        var res = users.split("\n");
        var result = "";
        for (r in res) {
            if (res[r] != "") { //CAMBIAR result += "<li>" + res[r] + "</li>"
                result = result + "<li>" + res[r] + "</li>";
            }
        }
        document.getElementById("users").innerHTML=result;
    });
}
