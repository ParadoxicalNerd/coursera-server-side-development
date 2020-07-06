import express from 'express'
// import UserService from '../services/users'
import passport from 'passport'
import User, { userType } from '../models/users'
import { ErrorWithStatus } from '../customTypes'

import bodyParser from 'body-parser'
import { verify, getToken } from '../authenticate'
let router = express.Router();
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.statusCode = 200
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err: Error, user: userType) => {
    if (err) {
      res.status(200)
      res.json(err)
    } else {
      passport.authenticate('local')(req, res, () => {
        res.status(200)
        res.json(user)
      })
    }
  })
})

// Using passport as a middleware
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user)
  const token = getToken(req.user)
  res.status(200)
  res.json({ message: 'Success', token })
})

router.get('/logout', (req, res, next) => {
  // console.log(req)
  if (req.session) {
    // @ts-ignore
    req.session.destroy();
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