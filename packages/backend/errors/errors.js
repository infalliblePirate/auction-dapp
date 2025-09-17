class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

class TransactionFailedError extends BaseError {
  constructor(message = 'Transaction failed') {
    super(message, 400);
    this.name = 'TransactionFailedError';
  }
}

class EventNotFoundError extends BaseError {
  constructor(message = 'Event not found') {
    super(message, 500);
    this.name = 'EventNotFoundError';
  }
}

export { TransactionFailedError, EventNotFoundError, BaseError };
