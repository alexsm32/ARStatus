function getPM2Info () {
	socket.on('pm2List', function (list) {
		var res = list.split("\n");
		var result = "<tr><th>APP Name</th><th>ID</th><th>Mode</th><th>PID</th><th>Status</th><th>Restart</th><th>Uptime</th><th>CPU</th><th>MEM</th><th>User</th><th>Watching</th></tr>";
		for (r in res) {
            if (res[r] != "") { 
                var resu = res[r].split('│');
                res[r] = "";
                for (i in resu) {
		    if (i != 0) {
                    res[r] += "<td>" + resu[i] + "</td>";
		    }
                }
            result = result + "<tr>" + res[r] + "</tr>";
            }
        }

	    document.getElementById("pm2info").innerHTML=result;
	});
}