const service = require('./theaters.servicer')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function list(req, res) {
    const { movieId } = req.params
    let data
    if (movieId) {
        data = await service.listTheatersByMovieId(movieId)
    } else {
        data = await service.list()
    }
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list)
}