import 'dotenv/config';
import express from 'express';

import { router } from './routes/routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { registerEventSystem } from './events/eventSystem.js';
import { logger } from './logger.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.use(errorHandler); // error handler after routes

registerEventSystem();
app.listen(port, () => logger.info(`Server running at http://localhost:${port}`));