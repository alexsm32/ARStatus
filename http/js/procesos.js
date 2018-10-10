function getProcess () {
	socket.on('toplist', function (toplist) {
        var res = toplist.split("\n");
        var result = "<tr><th>PID</th><th>Nombre</th><th>CPU</th><th>MEM</th></tr>";
        for (r in res) {
            if (res[r] != "") { 
                var resu = res[r].split(" ");
                res[r] = "";
                for (i in resu) {
                    res[r] += "<td>" + resu[i] + "</td>";
                }
            result = result + "<tr>" + res[r] + "</tr>";
            }
        }
        document.getElementById("toplist").innerHTML=result;
    });
}
