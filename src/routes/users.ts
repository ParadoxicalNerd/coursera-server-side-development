import express from 'express'
import UserService from '../services/users'

import User, { userType } from '../models/users'
import { ErrorWithStatus } from '../config/customTypes'

import bodyParser from 'body-parser'
let router = express.Router();
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.statusCode = 200
  res.send('respond with a resource');
});

router.post('/signup', async (req, res, next) => {
  let { result, error } = await UserService.createUser(req.body.username, req.body.password)
  if (!error) {
    res.statusCode = 200
    res.contentType('json')
    res.send({ message: 'New user successfully created!', user: result })
  } else {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  if (req.session?.user) {
    // if (req.session.user === 'admin') {
    //   next()
    // } else {
    //   let error: ErrorWithStatus = new Error('You\'re unauthenticated')
    //   error.status = 401
    //   next(error)
    // }
    res.statusCode = 200
    res.send('Already authenticated')
  } else {

    const authHeader = req.headers.authorization

    if (!authHeader) {
      let error: ErrorWithStatus = new Error('You\'re unauthenticated')
      error.status = 401
      res.setHeader('WWW-Authenticate', 'Basic')
      next(error)

    } else {

      let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
      const username = auth[0]
      const password = auth[1]

      // try {
      //   const user = await User.findOne({ username }).exec()
      //   if (user == null) {
      //     let error: ErrorWithStatus = new Error('User does not exist')
      //     error.status = 403
      //     next(error)
      //   } else if (user.password != password){
      //     let error: ErrorWithStatus = new Error('Invalid password')
      //     error.status = 403
      //     next(error)
      //   } else {
      //     req.session!.user='authenticated'
      //     res.statusCode=200
      //     res.send({message:'Your\'re authenticated'})
      //   }
      // } catch (err) {
      //   next(err)
      // }

      let { result, error } = await UserService.login(username, password)
      if (!error) {
        req.session!.user = 'authenticated'
        res.statusCode = 200
        res.send({ message: 'Your\'re authenticated', result })
      } else {
        next(error)
      }
    }
  }
})

// router.get('/logout', async (req, res, next) => {
//   try {
//     if (req.session) {
//       req.session.destroy(err => err && console.log(err))
//       res.clearCookie('session-id')
//       res.redirect('/')
//     } else {
//       const err: ErrorWithStatus = new Error('You aren\'t logged in')
//       err.status = 403
//       next(err)
//     }
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/logout', (req, res, next) => {
  console.log(req)
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