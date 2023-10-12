let BadRequest = class BadRequest extends Error {
  constructor(status, errorMessage) {
    super();
    this.status = status;
    this.errMsg = errorMessage;
    this.stack = this.stack;
  }

  getError() {
    return {
      status: this.status,
      message: this.message,
      stack: this.stack,
    };
  }
};

module.exports = BadRequest;
