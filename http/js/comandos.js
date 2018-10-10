function powerManager (command) {
	socket.emit('power', command);
}

function mySQL (command) {
	socket.emit('mysql', command);
}

function openVPN (command) {
	socket.emit('vpn', command);
}

function apache (command) {
	socket.emit('apache', command);
}

function sshd (command) {
	socket.emit('sshd', command);
}

function vnc (command) {
	socket.emit('vnc', command);
}

function trans (command) {
	socket.emit('trans', command);
}

function samba (command) {
	socket.emit('samba', command);
}

function vsftp (command) {
	socket.emit('vsftp', command);
}

function minidlna (command) {
	socket.emit('minidlna', command);
}

function statusServices () {
	socket.on('sqlStatus', function (data) {
		document.getElementById("estado1").innerHTML=data;
	});

	socket.on('vpnStatus', function (data) {
		document.getElementById("estado2").innerHTML=data;
	});

	socket.on('apacheStatus', function (data) {
		document.getElementById("estado3").innerHTML=data;
	});

	socket.on('sshdStatus', function (data) {
		document.getElementById("estado4").innerHTML=data;
	});

	socket.on('vncStatus', function (data) {
		document.getElementById("estado5").innerHTML=data;
	});

	socket.on('transStatus', function (data) {
		document.getElementById("estado6").innerHTML=data;
	});

	socket.on('sambaStatus', function (data) {
		document.getElementById("estado7").innerHTML=data;
	});

	socket.on('vsftpStatus', function (data) {
		document.getElementById("estado8").innerHTML=data;
	});

	socket.on('minidlnaStatus', function (data) {
		document.getElementById("estado9").innerHTML=data;
	});
}
