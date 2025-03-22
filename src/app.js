const express = require('express');
const { config } = require('./config/config');
const cors = require('cors');
const routerApi = require('./routes');

const port = config.server_port;
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Test home route
app.get('/', (req,res) => {
    res.send('API DEPLOYED');
});

// Api route
routerApi(app);

// 404 Middleware route
app.use((req, res, next) => {
    res.status(404).send({ success: false, message: 'URL Not Found' });
});

// Start server
app.listen(port,()=>{
    console.log("Port ==> ", port);
});