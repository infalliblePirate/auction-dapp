require('dotenv').config();
const express = require('express');

const routes = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler');
const { registerEventSystem } = require('./events/eventSystem');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler); // error handler after routes

registerEventSystem();




app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));