// import express from 'express';
// import passport from 'passport';

// const usersRouter = express.Router();

// usersRouter.post('/users/login', (req, res, next) => {
//   if (!req.body.user.email) {
//     return res.status(422).json({ errors: { email: "can't be blank" } });
//   }

//   if (!req.body.user.password) {
//     return res.status(422).json({ errors: { password: "can't be blank" } });
//   }
//   passport.authenticate('local', { session: false }, (
//     err,
//     user,
//     info
//   ) => {
//     if (err) {
//       return next(err);
//     }

//     if (user) {
//       return res.json({ user: user.toAuthJSON() });
//     }
//     return res.status(422).json(info);
//   })(req, res, next);
// });


// export default usersRouter;


import { Router } from 'express';
import logoutRoute from './logout.route';

const usersRouter = Router();

usersRouter.use('/', logoutRoute);


export default usersRouter;
