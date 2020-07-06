import mongose from 'mongoose'
import config from '../config'

export default async () => {
    try {
        await mongose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
        console.log('Connected to database')
        return
    } catch (error) {
        console.error(error)
        return
    }
}