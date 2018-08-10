const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  mongoose = require('mongoose'),
  Usuario = mongoose.model('usuarios'),
  keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secrectOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const usuario = await Usuario.findById(jwt_payload.id).exec();
        return usuario ? done(null, usuario) : done(null, false);
      } catch (err) {
        throw err;
      }
    })
  );
};
