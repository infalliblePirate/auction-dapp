import { logger } from '../logger.js';

function errorHandler(err, req, res, next) {
  logger.error({
    err,
    path: req.path,
    method: req.method,
    body: req.body,
  }, 'Unhandled error occurred');

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
}

export { errorHandler };