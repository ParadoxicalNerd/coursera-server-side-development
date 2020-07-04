import Leaders, { LeadersType } from '../models/leaders'

class Leaderservice {
    async getAllLeaders() {
        let document: LeadersType[] | null = null
        let error: any = null

        try {
            document = await Leaders.find({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }
    }


    async createNewLeader(attributes: object) {
        let document: LeadersType | null = null
        let error: any = null

        try {
            document = await Leaders.create(attributes)
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteAllLeaders() {
        let document: object = {}
        let error: any = null

        try {
            document = await Leaders.remove({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }

    }

    async getOneLeader(leaderID: string) {
        let document: LeadersType | null = null
        let error: any = null
        try {
            document = await Leaders.findById(leaderID).exec()
            if (!document) {
                throw { message: 'There is no leader by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async updateOneLeader(leaderID: string, updates: object) {
        let document: LeadersType | null = null
        let error: any = null

        try {
            document = await Leaders.findByIdAndUpdate(leaderID, { $set: updates }, { new: true }).exec()
            if (!document) {
                throw { message: 'There is no leader by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteOneLeader(leaderID: string) {
        let document: any = null
        let error: any = null

        try {
            let doc = await Leaders.findByIdAndDelete(leaderID).exec()
            if (!doc) {
                throw { message: 'There is no leader by this ID', code: 404 }
            } else {
                document = doc
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }
}

export default new Leaderservice()