// delegate is an async/await handler of middleware function
// defaultStatus is an optional parameter that allows you to 
// override the status code returned when the delegate throws an error
// asyncErrorBoundary returns an Express handler or middleware function
// it will eventually be called by Express in place of the delegate function
function asyncErrorBoundary(delegate, defaultStatus) {
  return (request, response, next) => {
      // this makes sure that the delegate function is called in a promise chain
      // Promise.resolve will make sure that the value returned is guaranteed to have a catch method
    Promise.resolve()
      .then(() => delegate(request, response, next))
      .catch((error = {}) => {
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;