import app from './server'
import http from 'http'

const port: number = 3000
http.createServer(app).listen(port, () =>
    console.log("Server is up and running on port " + port)
)