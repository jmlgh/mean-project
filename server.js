const http = require('http');
// second argument is an identifier
const debug = require('debug')('node-angular');
const app = require('./backend/app');

const normalizedPort = val => {
  let port = parseInt(val, 10);

  if(isNaN(port)){
    // named pipe
    return val;
  }

  if(port >= 0){
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if(error.syscall != "listen"){
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " +  port;
  switch(error.code){
    case "EACCES":
      console.log(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? "pipe " + addr : "port " + port;
  debug('Listenting on ' + bind);
};

const port = normalizedPort(process.env.PORT || 3000);
// set configuration for express app
app.set('port', port);

const server = http.createServer(app);
// register an error listener
server.on('error', onError);
// register a listener for when the server is actually listening
server.on('listening', onListening);
server.listen(port);
