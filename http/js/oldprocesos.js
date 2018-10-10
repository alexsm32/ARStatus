function getProcess () {
	socket.on('toplist', function (toplist) {
        var res = toplist.split("\n");
        var result = "";
        for (r in res) {
            if (res[r] != "") { //CAMBIAR result += "<li>" + res[r] + "</li>"
                result = result + "<li>" + res[r] + "</li>";
            }
        }
        document.getElementById("toplist").innerHTML=result;
    });
}

/*function getJobs () {
    socket.on('jobs', function (jobs) {
        var res = jobs.split("\n");
        var result = "";
        for (r in res) {
            if (res[r] != "") { //CAMBIAR result += "<li>" + res[r] + "</li>"
                result = result + "<li>" + res[r] + "</li>";
            }
        }
        document.getElementById("jobs").innerHTML=result;
    });
}*/