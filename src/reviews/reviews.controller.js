const service = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

async function reviewExists(req, res, next) {
    console.log(req.params.reviewId)
    const review = await service.read(Number(req.params.reviewId))
    if (review) {
        res.locals.review = review
        return next()
    }
    next({ status: 404, message: 'Reviews cannot be found.'})
}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const data = await service.update(updatedReview)
    updatedReview.critic = data
    console.log(updatedReview)
    res.json({ data: updatedReview })
}

async function read(req, res) {
    res.json({ data: res.locals.review })
}

async function destroy(req, res) {
    const { review } = res.locals
    await service.destroy(review.review_id)
    res.sendStatus(204)
}

module.exports = {
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}