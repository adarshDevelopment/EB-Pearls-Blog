const http = require("http");
const app = require('./src/config/express.config')
const {AppConfig} = require('./src/config/config')

const PORT = AppConfig.port;
const server = http.createServer(app);

server.listen(PORT, ()=>{
  console.log(`Server is being hosted on http://localhost:${PORT}`)
})
