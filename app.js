require('./config/dotenv');
require('./config/mongoose');
const Server = require('./config/server');

const server = new Server();
server.listen();
