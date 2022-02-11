// const queryBuilder  = require("../db/connection");
// const mapProperties = require("../utils/map-properties");
const knex = require("../db/connection");

function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing)
      {
        queryBuilder
          .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id")
      }
    });
}

function read(movie_id) {
  return knex("movies").where({ movie_id }).first();
}

module.exports = {
  list,
  read,
};

// function readTheaters(movie_id) {
//   return knex("theaters")
//     .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
//     .select("*")
//     .where("movie_id", movie_id); //??? what does this line translate to
// }

// const addCritic = mapProperties({
//   critic_id: "critic.critic_id",
//   preferred_name: "critic.critic_preferred_name",
//   surname: "critic.critic_surname",
//   organization_name: "critic.critic_organization_name",
// });

// function readReviews(movie_id) { //???why is it movie_id
//   return knex("reviews")
//     .join("critics", "critics.critic_id", "reviews.critic_id")
//     .select("*")
//     .where("movie_id", movie_id)
//     .then((data) => {
//       return Promise.all(data.map(addCritic));
//     });
// }

// module.exports = {
//   list,
//   read,
//   readTheaters,
//   readReviews,
// };