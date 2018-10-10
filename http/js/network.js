function getPorts () {
	socket.on('netstat', function (netstat) {
        var res = netstat.split("\n");
        var result = "<tr><th>Protocolo</th><th>Direccion Local</th><th>Direccion Remota</th><th>Estado</th><th>Proceso</th></tr>";
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
        document.getElementById("netstat").innerHTML=result;
    });
}