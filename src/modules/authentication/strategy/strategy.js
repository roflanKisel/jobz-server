import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { User } from '../../../models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({
    where: { id },
  })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({
        where: { email },
      })
        .then((user) => {
          if (user) {
            return password === user.password ? done(null, user) : done(null, false);
          }
          return done(null, false);
        })
        .catch((err) => {
          done(err);
        });
    },
  ),
);
