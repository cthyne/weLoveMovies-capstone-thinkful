const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const foundMovie = await service.read(req.params.movieId);
  if (foundMovie)
  {
    res.locals.movie = foundMovie;
    return next();
  } else
  {
    next({ status: 404, message: `Movie cannot be found.` });
  }
}

async function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

async function list(req, res, next) {
  const data = await service.list(req.query.is_showing); //???req.query.is_showing
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};