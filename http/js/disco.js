function getDiscos () {
	socket.on('discos', function (netstat) {
        var res = netstat.split("\n");
        var result = "<tr><th>Filesystem</th><th>Size</th><th>Used</th><th>Avail</th><th>Use%</th><th>Mounted on</th></tr>";
        for (r in res) {
            if (res[r] != "") {
                var resu = res[r].split(" ");
                res[r] = "";
                for (i in resu) {
                  if (i == 0) {
                    var resuc = resu[i].split("/");
                    res[r] += "<td>" + resuc[resuc.length - 1] + "</td>";
                  }
                  else if (i == resu.length - 1) {
                    var resuf = resu[i].split("/");
                    res[r] += "<td>" + resuf[resuf.length - 1] + "</td>";
                  }
                  else {
                    res[r] += "<td>" + resu[i] + "</td>";
                  }
                }
            result = result + "<tr>" + res[r] + "</tr>";
            }
        }
        document.getElementById("discos").innerHTML=result;
    });
}
