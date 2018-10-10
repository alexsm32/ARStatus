var app = require('http').createServer(handler).listen(8888, "0.0.0.0"),
  url = require('url'),
  mime = require('mime'),
  io = require('socket.io').listen(app, { log: false }),
  fs = require('fs');
  
var conexion = require('./conexion.js').inicio(io),
    telegram = require('./bot.js').inicio();

function handler (pedido, respuesta) {
	var objetourl = url.parse(pedido.url);
	var camino ='./http' + objetourl.pathname;
	switch(camino) {
    case './http/':
        camino ='./http/index.html';
        cargador(respuesta, camino);
        break;
    /*case n:
        code block
        break;*/
    default:
        cargador(respuesta, camino);
}
	
}

function cargador (respuesta, camino) {
    fs.exists(camino, function(existe){
        if (existe) {
            fs.readFile(camino,function(error, contenido){
                if (error) {
                    respuesta.writeHead(500, {'Content-Type': 'text/plain'});
                    respuesta.write('Error interno');
                    respuesta.end();                    
                } else {
                    var tipo = mime.lookup(camino);
                    console.log(tipo);
                    respuesta.writeHead(200, {'Content-Type': tipo});
                    respuesta.write(contenido);
                    respuesta.end();
                }
            });
        } else {
            respuesta.writeHead(404, {'Content-Type': 'text/html'});
            respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');        
            respuesta.end();
        }
    });
}




