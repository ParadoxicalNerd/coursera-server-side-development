import express from 'express'
import cor, { CorsOptions, CorsOptionsDelegate } from 'cors'

const app = express()

const whitelist = ['http://localhost:3000', 'https://localhost:3443']

const opts: CorsOptionsDelegate = (req, callback) => {
    if (req.header('Origin') && whitelist.indexOf(req.header('Origin')!) != -1) {
        callback(null, { origin: true })
    } else {
        callback(null, { origin: false })
    }
}

export const cors = cor()
export const corsWhitelisted = cor(opts)