import express from 'express'
import bodyParser from 'body-parser'
import { verifyUser, verifyAdmin } from '../authenticate'

const router = express.Router()
router.use(bodyParser.json())


import DishService from '../services/dishes'

// ##########################################################
//                      Root routing
// ##########################################################
router.route('/')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await DishService.getAllDishes()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await DishService.createNewDish(req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }

    })
    .put(verifyUser, verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.send({ message: "Operation not supported", })
    })
    .delete(verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await DishService.deleteAllDishes()
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })


// ##########################################################
//                      Dish routing
// ##########################################################
router.route('/:dishID')
    .all((req, res, next) => {
        res.type('json')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await DishService.getOneDish(req.params.dishID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(verifyUser, verifyAdmin, (req, res, next) => {
        res.status(403)
        res.send({ error: "Cannot create dish this way" })
    })
    .put(verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await DishService.updateOneDish(req.user._id, req.params.dishID, req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .delete(verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await DishService.deleteOneDish(req.params.dishID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })

// ##########################################################
//               Dish comments root routing
// ##########################################################
router.route('/:dishID/comments')
    .all((req, res, next) => {
        res.type('text')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await DishService.getAllComments(req.params.dishID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(verifyUser, async (req, res, next) => {
        req.body.author = req.user._id
        const { document, error } = await DishService.createNewComment(req.params.dishID, req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .put(verifyUser, (req, res, next) => {
        res.statusCode = 400
        res.send('Impossible request')
    })
    .delete(verifyUser, verifyAdmin, async (req, res, next) => {
        const { document, error } = await DishService.deleteAllComments(req.params.dishID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })


// ##########################################################
//                    Dish comments routing
// ##########################################################
router.route('/:dishID/comments/:commentID')
    .all((req, res, next) => {
        res.type('text')
        next()
    })
    .get(async (req, res, next) => {
        const { document, error } = await DishService.getOneComment(req.params.dishID, req.params.commentID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .post(verifyUser, (req, res, next) => {
        res.status(400)
        res.send("Can't set name this way")
    })
    .put(verifyUser, async (req, res, next) => {
        req.body.author = req.user._id
        const { document, error } = await DishService.updateOneComment(req.user._id, req.params.dishID, req.params.commentID, req.body)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })
    .delete(verifyUser, async (req, res, next) => {
        req.body.author = req.user._id
        const { document, error } = await DishService.deleteOneComment(req.user._id, req.params.dishID, req.params.commentID)
        if (!error) {
            res.statusCode = 200
            res.send(document)
        } else {
            next(error)
        }
    })

export default router