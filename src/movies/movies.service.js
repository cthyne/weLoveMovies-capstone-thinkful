const { first } = require('../db/connection')
const knex = require('../db/connection')
const reduceProperties = require('../utils/reduce-properties')

/*const addCritic = reduceProperties('critic_id', {
    critic_id: ['critics', 'critic_id'],
    preferred_name: ['critics', 'preferred_name'],
    surname: ['critics', 'surname'],
    organization_name: ['critics', 'organization_name'],
    created_at: ['critics', 'created_at'],
    updated_at: ['critics', 'updated_at']
})*/
// /movies
function list() {
    return knex('movies').select('*')
}
// /movies?is_showing=true
function listMoviesShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true })
    .orderBy("m.movie_id")
}
// /movies/:movieId
function read(movie_id) {
    return knex('movies')
        .where({ movie_id })
        .first()
}

function listTheatersAndMovie(movie_id) {
    return knex("movies as m")
      .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
      .join('theaters as t', 't.theater_id', 'mt.theater_id')
      .select('t.*','mt.*')
      .where({ "m.movie_id": movie_id })
}

function listReviewsAndMovie(movie_id) {
    return knex("movies as m")
      .join('reviews as r', 'r.movie_id', 'm.movie_id')
      .join('critics as c', 'c.critic_id', 'r.critic_id')
      .select('r.*', 'c.*')
      .where({ 'r.movie_id': movie_id })
      .then((reviews) => {
        return reviews.map((review) => {
            return {
              review_id: review.review_id,
              content: review.content,
              score: review.score,
              created_at: review.created_at,
              updated_at: review.updated_at,
              critic_id: review.critic_id,
              movie_id: review.movie_id,
              critic: {
                critic_id: review.critic_id,
                preferred_name: review.preferred_name,
                surname: review.surname,
                organization_name: review.organization_name,
                created_at: review.created_at,
                updated_at: review.updated_at,
              },
            };
        });
    })
}

module.exports = { 
    list,
    listMoviesShowing,
    read,
    listTheatersAndMovie,
    listReviewsAndMovie
}