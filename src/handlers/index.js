import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import error from 'koa-error';
import views from 'koa-views';
import session from 'koa-session';
import passport from 'koa-passport';
import config from '../config';

export default (app) => {
  app.use(cors());

  app.keys = [config.env.jwt.secret];
  app.use(session(app));
  app.use(bodyParser());

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    error({
      engine: 'pug',
      template: `${config.VIEW_PATH}/error.pug`,
    }),
  );
  app.use(views(config.VIEW_PATH));
};
