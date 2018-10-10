var child;

function powerManager (socket, exec) {
	socket.on('power', function (command) {
		switch (command) {
			case 'restart':
				child = exec('init 6');
				break;
			case 'poweroff':
				child = exec('init 0');
				break;
		}
	});
}

function mySQL (socket, exec) {
	socket.on('mysql', function (command) {
		switch (command) {
			case 'start':
				child = exec('service mysqld start');
				break;
			case 'stop':
				child = exec('service mysqld stop');
				break;
			case 'restart':
				child = exec('service mysqld restart');
				break;
			case 'status':
				child = exec('service mysqld status', function (error, stdout, stderr) {
					socket.emit('sqlStatus', stdout);
				});
				break;
		}
	});
}

function openVPN (socket, exec) {
	socket.on('vpn', function (command) {
		switch (command) {
			case 'start':
				child = exec('service openvpn start');
				break;
			case 'stop':
				child = exec('service openvpn stop');
				break;
			case 'restart':
				child = exec('service openvpn restart');
				break;
			case 'status':
				child = exec('service openvpn status', function (error, stdout, stderr) {
					socket.emit('vpnStatus', stdout);
				});
				break;
		}
	});
}

function apache (socket, exec) {
	socket.on('apache', function (command) {
		switch (command) {
			case 'start':
				child = exec('service httpd start');
				break;
			case 'stop':
				child = exec('service httpd stop');
				break;
			case 'restart':
				child = exec('service httpd restart');
				break;
			case 'status':
				child = exec('service httpd status', function (error, stdout, stderr) {
					socket.emit('apacheStatus', stdout);
				});
				break;
		}
	});
}

function sshd (socket, exec) {
	socket.on('sshd', function (command) {
		switch (command) {
			case 'start':
				child = exec('service sshd start');
				break;
			case 'stop':
				child = exec('service sshd stop');
				break;
			case 'restart':
				child = exec('service sshd restart');
				break;
			case 'status':
				child = exec('service sshd status', function (error, stdout, stderr) {
					socket.emit('sshdStatus', stdout);
				});
				break;
		}
	});
}

function vnc (socket, exec) {
	socket.on('vnc', function (command) {
		switch (command) {
			case 'start':
				child = exec('service vncserver start');
				break;
			case 'stop':
				child = exec('service vncserver stop');
				break;
			case 'restart':
				child = exec('service vncserver restart');
				break;
			case 'status':
				child = exec('service vncserver status', function (error, stdout, stderr) {
					socket.emit('vncStatus', stdout);
				});
				break;
		}
	});
}

function trans (socket, exec) {
	socket.on('trans', function (command) {
		switch (command) {
			case 'start':
				child = exec('service transmission-daemon start');
				break;
			case 'stop':
				child = exec('service transmission-daemon stop');
				break;
			case 'restart':
				child = exec('service transmission-daemon restart');
				break;
			case 'status':
				child = exec('service transmission-daemon status', function (error, stdout, stderr) {
					socket.emit('transStatus', stdout);
				});
				break;
		}
	});
}

function samba (socket, exec) {
	socket.on('samba', function (command) {
		switch (command) {
			case 'start':
				child = exec('service smb start');
				break;
			case 'stop':
				child = exec('service smb stop');
				break;
			case 'restart':
				child = exec('service smb restart');
				break;
			case 'status':
				child = exec('service smb status', function (error, stdout, stderr) {
					socket.emit('sambaStatus', stdout);
				});
				break;
		}
	});
}

function vsftp (socket, exec) {
	socket.on('vsftp', function (command) {
		switch (command) {
			case 'start':
				child = exec('service vsftpd start');
				break;
			case 'stop':
				child = exec('service vsftpd stop');
				break;
			case 'restart':
				child = exec('service vsftpd restart');
				break;
			case 'status':
				child = exec('service vsftpd status', function (error, stdout, stderr) {
					socket.emit('vsftpStatus', stdout);
				});
				break;
		}
	});
}

function minidlna (socket, exec) {
	socket.on('minidlna', function (command) {
		switch (command) {
			case 'start':
				child = exec('service minidlna start');
				break;
			case 'stop':
				child = exec('service minidlna stop');
				break;
			case 'restart':
				child = exec('service minidlna restart');
				break;
			case 'status':
				child = exec('service minidlna status', function (error, stdout, stderr) {
					socket.emit('minidlnaStatus', stdout);
				});
				break;
		}
	});
}


exports.powerManager = powerManager;
exports.mySQL = mySQL;
exports.openVPN = openVPN
exports.apache = apache;
exports.sshd = sshd;
exports.vnc = vnc;
exports.trans = trans;
exports.samba = samba;
exports.vsftp = vsftp;
exports.minidlna = minidlna;
