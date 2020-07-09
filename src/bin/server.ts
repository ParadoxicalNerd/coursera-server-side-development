#!/usr/bin/env node

import app from '../app'
import http from 'http'

import https from 'https'
import fs from 'fs'

const port: number = (parseInt(process.env.PORT || '3000'))
const securePort: number = port + 443

const server = http.createServer(app)

server.listen(port, () =>
    console.log("Server is up and running on port " + port)
)

const options = {
    key: fs.readFileSync(__dirname + '/private.key'),
    cert: fs.readFileSync(__dirname + '/certificate.crt')
}

const secureServer = https.createServer(options, app)
secureServer.listen(securePort, () =>
    console.log("Secure server is up and running on port " + securePort)
)