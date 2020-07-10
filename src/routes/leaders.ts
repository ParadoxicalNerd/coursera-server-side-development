import express from 'express'
import bodyParser from 'body-parser'

import { verifyUser, verifyAdmin } from '../authenticate'

const router = express.Router()
router.use(bodyParser.json())


import LeaderService from '../services/leaders'
import { corsWhitelisted, cors } from './cors'

// ##########################################################
//                      Root routing
// ##########################################################
router.route('/')
    .options(corsWhitelisted, (req, res, next) => res.sendStatus(200))
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(cors, async (req, res, next) => {
        const { document, error } = await LeaderService.getAllLeaders()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(corsWhitelisted, verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await LeaderService.createNewLeader(req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .put(corsWhitelisted, verifyUser, verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.send({ message: "Operation not supported", })
    })
    .delete(corsWhitelisted, verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await LeaderService.deleteAllLeaders()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })


// ##########################################################
//                      Leader routing
// ##########################################################
router.route('/:leaderID')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(cors, async (req, res, next) => {
        const { document, error } = await LeaderService.getOneLeader(req.params.leaderID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(corsWhitelisted, verifyUser, verifyAdmin, (req, res, next) => {
        res.status(403)
        res.send({ error: "Cannot create leader this way" })
    })
    .put(corsWhitelisted, verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await LeaderService.updateOneLeader(req.params.leaderID, req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .delete(corsWhitelisted, verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await LeaderService.deleteOneLeader(req.params.leaderID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })

export default router