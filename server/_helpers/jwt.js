const expressJwt = require("express-jwt");
const config = require("../../config.json");
const userService = require("../services/user.service");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/register",
      "/api/users/login",
      "/api/books",
      /^\/api\/statistics\/([^\/]*)$/,
      { url: "/api/categories", methods: ["GET"] },
      { url: "/api/comments/get", methods: ["POST"] },
      { url: /^\/api\/commentsRating\/([^\/]*)$/, methods: ["GET"] },
      { url: /^\/api\/booksRating\/([^\/]*)$/, methods: ["GET"] },
      ,
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
