'use strict';
require('dotenv').config();

const express = require('express');
const RouterBuilder = require('./routes');
const cors = require('cors');
const message = require('./utils/message');

message().catch((err) => {
  console.log("Error occurred: ", err);
});
process.env.SOCKET_PORT  = process.env.SOCKET_PORT || 4200;
const app = express();
app.use(cors());

RouterBuilder.build(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Api Start on server ${port}...`));
