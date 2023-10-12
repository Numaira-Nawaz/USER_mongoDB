// Implementation 1: Using Promise.resolve

const catchAsync = (fn) => (req, res, next) => {
  // Advantage: Works with both promise-returning and non-promise-returning functions.
  Promise.resolve(fn(req, res, next))
    .catch((error) => next(error));
  // Limitation: Wraps non-promise-returning functions in a promise, potentially unnecessary.
};

module.exports = catchAsync;
