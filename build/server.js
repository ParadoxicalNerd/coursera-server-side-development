"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const dishes_1 = __importDefault(require("./routes/dishes"));
const leaders_1 = __importDefault(require("./routes/leaders"));
const promotions_1 = __importDefault(require("./routes/promotions"));
const models_1 = __importDefault(require("./models"));
models_1.default();
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const ConnectedFilestore = session_file_store_1.default(express_session_1.default);
var app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Setting up validation method
// app.use(cookieParser('qwertyuiopasdfghjklzxcvbnm'));
app.use(express_session_1.default({
    name: 'session-id',
    secret: "qwertyuiopasdfghjklzxcvbnm",
    saveUninitialized: false,
    resave: false,
    store: new ConnectedFilestore()
}));
// Setting up validation
function manulaAuthenticate(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        if (req.session.user === 'admin') {
            next();
        }
        else {
            let error = new Error('You\'re unauthenticated');
            error.status = 401;
            next(error);
        }
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        let error = new Error('You\'re unauthenticated');
        error.status = 401;
        res.setHeader('WWW-Authenticate', 'Basic');
        next(error);
        return;
    }
    else {
        let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        const username = auth[0];
        const password = auth[1];
        if (username === 'admin' && password === 'admin') {
            // res.cookie('userType', 'admin', { 'signed': true })
            req.session.user = 'admin';
            next();
        }
        else {
            let error = new Error('You\'re unauthenticated');
            error.status = 401;
            res.setHeader('WWW-Authenticate', 'Basic');
            next(error);
            return;
        }
    }
}
app.use(manulaAuthenticate);
// Static file server
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Pass info to various functions
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/dishes', dishes_1.default);
app.use('/leaders', leaders_1.default);
app.use('/promotions', promotions_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=server.js.map