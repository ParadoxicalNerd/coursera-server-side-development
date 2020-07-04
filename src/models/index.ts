import mongose from 'mongoose'

export default async () => {
    try {
        const dbName = 'coursera'
        const url = `mongodb+srv://db:db@experimentation-cluster-evmu6.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
        await mongose.connect(url, {
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