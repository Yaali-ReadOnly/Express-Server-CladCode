const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models').User;
const Role = require('../models').Role;
const Brand = require('../models').Brand;

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'nodeauthsecret',
  };
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    User
      .findByPk(jwt_payload.id, {
        include: [
          {
            model: Role,
            as: "role"
          },
          {
            model: Brand,
            as: "brand"
          }
        ]
      })
      .then((user) => { return done(null, user); })
      .catch((error) => { return done(error, false); });
  }));
};
