import express from 'express'
// import UserService from '../services/users'
import passport from 'passport'
import User, { userType } from '../models/users'

import bodyParser from 'body-parser'
import { getToken, verifyAdmin, verifyUser } from '../authenticate'
let router = express.Router();
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', verifyUser, verifyAdmin, function (req, res, next) {
  User.find({}).exec().then((val) => {
    res.statusCode = 200
    res.send(val);
  })
});

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err: Error, user: userType) => {
    if (err) {
      res.status(200)
      res.json(err)
    } else {
      if (req.body.firstName) user.firstName = req.body.firstName
      if (req.body.lastName) user.lastName = req.body.lastName

      const save_user: any = user
      save_user.save((err: any, user: any) => {

        if (err) {
          res.status(200)
          res.json(err)
        }

        passport.authenticate('local')(req, res, () => {
          res.status(200)
          res.json(user)
        })
      })
    }
  })
})

// Using passport as a middleware
router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = getToken(req.user)
  res.status(200)
  res.json({ message: 'Success', token })
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const token = getToken(req.user)
  res.status(200)
  res.json({ message: 'Success', token, user: req.user })
})

router.get('/logout', (req, res, next) => {
  // console.log(req)
  if (req.session) {
    req.session.destroy(err => next(err));
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err: ErrorWithStatus = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

export default router