import Promotions, { PromotionsType } from '../models/promotions'

class PromotionService {
    async getAllPromotions() {
        let document: PromotionsType[] | null = null
        let error: any = null

        try {
            document = await Promotions.find({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }
    }


    async createNewPromotion(parameters: object) {
        let document: PromotionsType | null = null
        let error: any = null

        try {
            document = await Promotions.create(parameters)
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteAllPromotions() {
        let document: object = {}
        let error: any = null

        try {
            document = await Promotions.remove({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }

    }

    async getOnePromotion(promotionID: string) {
        let document: PromotionsType | null = null
        let error: any = null
        try {
            document = await Promotions.findById(promotionID).exec()
            if (!document) {
                throw { message: 'There is no promotion by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async updateOnePromotion(promotionID: string, updates: object) {
        let document: PromotionsType | null = null
        let error: any = null

        try {
            document = await Promotions.findByIdAndUpdate(promotionID, { $set: updates }, { new: true }).exec()
            if (!document) {
                throw { message: 'There is no promotion by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteOnePromotion(promotionID: string) {
        let document: any = null
        let error: any = null

        try {
            let doc = await Promotions.findByIdAndDelete(promotionID).exec()
            if (!doc) {
                throw { message: 'There is no promotion by this ID', code: 404 }
            } else {
                document = doc
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }
}

export default new PromotionService()