import passport from 'passport'
import localStrategy, { Strategy } from 'passport-local'
import User from './models/users'

export default () => {
    passport.use(new Strategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}