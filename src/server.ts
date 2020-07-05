import createError from 'http-errors'
import express, { NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { ErrorWithStatus } from './config/customTypes'

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

// Setting up validation method
app.use(session({
    name: 'session-id',
    secret: "qwertyuiopasdfghjklzxcvbnm",
    saveUninitialized: false,
    resave: false,
    store: new ConnectedFilestore()
}))

// Globally accessable pages
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Setting up validation
function maunualAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.session?.user) {
        const error: ErrorWithStatus = Error('Authenticate yourself first')
        error.status = 403
        next(error)
    } else {
        if (req.session.user == 'authenticated') {
            next()
        } else {
            const error: ErrorWithStatus = Error('Invalid user')
            error.status = 403
            next(error)
        }
    }
}

app.use(maunualAuth)

// Static file server
app.use(express.static(path.join(__dirname, 'public')));

// Pass info to various functions
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