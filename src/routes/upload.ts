import express from 'express'
import bodyParser from 'body-parser'
import { verifyAdmin, verifyUser } from '../authenticate'
import multer from 'multer'

const opts: multer.Options = {
    fileFilter: (req, file, callback) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|git|svg)$/)) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type'))
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/images')
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    })
}

const upload = multer(opts)

const uploadRouter = express.Router()
uploadRouter.use(bodyParser.json())

uploadRouter.route('/')
    .get(verifyUser, verifyAdmin, (req, res, next) => {
        res.status(403)
        res.send('GET operation is not supported')
    })
    .post(verifyUser, verifyAdmin, upload.single('imageFile'), (req, res, next) => {
        res.status(200)
        res.send('File successfully uploaded')
    })
    .put(verifyUser, verifyAdmin, (req, res, next) => {
        res.status(403)
        res.send('PUT operation is not supported')
    })
    .delete(verifyUser, verifyAdmin, (req, res, next) => {
        res.status(403)
        res.send('DELETE operation is not supported')
    })

export default uploadRouter