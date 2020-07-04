import express from 'express'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(bodyParser.json())


import PromotionService from '../services/promotions'

// ##########################################################
//                      Root routing
// ##########################################################
router.route('/')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await PromotionService.getAllPromotions()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(async (req, res, next) => {
        const { document, error } = await PromotionService.createNewPromotion(req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }

    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.send({ message: "Operation not supported", })
    })
    .delete(async (req, res, next) => {
        const { document, error } = await PromotionService.deleteAllPromotions()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })


// ##########################################################
//                      Promotion routing
// ##########################################################
router.route('/:promotionID')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await PromotionService.getOnePromotion(req.params.promotionID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post((req, res, next) => {
        res.status(403)
        res.send({ error: "Cannot create promotion this way" })
    })
    .put(async (req, res, next) => {
        const { document, error } = await PromotionService.updateOnePromotion(req.params.promotionID, req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .delete(async (req, res, next) => {
        const { document, error } = await PromotionService.deleteOnePromotion(req.params.promotionID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })

export default router