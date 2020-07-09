import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import User from './models/users'
import config from './config'
import { NextFunction } from 'express'

export const local = passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

export const getToken = (user: any) => {
    return jwt.sign(user.toJSON(), config.secretKey, {
        expiresIn: "12h"
    })
}

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
}

export const jwtPassport = passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const res = await User.findById(payload._id)
        if (res) {
            return done(null, res)
        } else {
            return done(null, false)
        }
    } catch (error) {
        return done(error)
    }
}))

export const verifyUser = passport.authenticate('jwt', { session: false })

export const verifyAdmin = (req: Express.Request, res: Express.Response, next: NextFunction) => {
    User.findById(req.user._id).exec().then(
        (user) => {
            if (user && user.admin) {
                next()
            } else {
                const err: ErrorWithStatus = new Error('You are not authorized to perform this operation!')
                err.status = 403
                next(err)
            }
        }, err => next(err)
    ).catch(err => next(err))
}