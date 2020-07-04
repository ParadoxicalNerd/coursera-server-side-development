import createError from 'http-errors'
import express, { NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import dishesRouter from './routes/dishes'
import leadersRouter from './routes/leaders'
import promotionsRouter from './routes/promotions'

import database from './models'
database()

import session from 'express-session'
import filestore from 'session-file-store'
const ConnectedFilestore = filestore(session)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up custom types
interface ErrorWithStatus extends Error {
    status?: number
}

// Setting up validation method

// app.use(cookieParser('qwertyuiopasdfghjklzxcvbnm'));
app.use(session({
    name: 'session-id',
    secret: "qwertyuiopasdfghjklzxcvbnm",
    saveUninitialized: false,
    resave: false,
    store: new ConnectedFilestore()
}))

// Setting up validation

function manulaAuthenticate(req: express.Request, res: express.Response, next: express.NextFunction) {

    if (req.session?.user) {
        if (req.session.user === 'admin') {
            next()
        } else {
            let error: ErrorWithStatus = new Error('You\'re unauthenticated')
            error.status = 401
            next(error)
        }
    }

    const authHeader = req.headers.authorization
    if (!authHeader) {
        let error: ErrorWithStatus = new Error('You\'re unauthenticated')
        error.status = 401
        res.setHeader('WWW-Authenticate', 'Basic')
        next(error)
        return
    } else {
        let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':')
        const username = auth[0]
        const password = auth[1]
        if (username === 'admin' && password === 'admin') {
            // res.cookie('userType', 'admin', { 'signed': true })
            req.session!.user = 'admin'
            next()
        } else {
            let error: ErrorWithStatus = new Error('You\'re unauthenticated')
            error.status = 401
            res.setHeader('WWW-Authenticate', 'Basic')
            next(error)
            return
        }
    }
}

app.use(manulaAuthenticate)

// Static file server
app.use(express.static(path.join(__dirname, 'public')));

// Pass info to various functions
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter)
app.use('/leaders', leadersRouter)
app.use('/promotions', promotionsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app