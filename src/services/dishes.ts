import Dishes, { DishesType, a } from '../models/dishes'
import { SubDocumentArray } from 'ts-mongoose/types/_shared'

class DishService {
    async getAllDishes() {
        let document: DishesType[] | null = null
        let error: any = null

        try {
            document = await Dishes.find({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }
    }


    async createNewDish(parameters: { name: string, description: string }) {
        let document: DishesType | null = null
        let error: any = null

        try {
            document = await Dishes.create({ name: parameters.name, description: parameters.description })
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteAllDishes() {
        let document: object = {}
        let error: any = null

        try {
            document = await Dishes.remove({}).exec()
        } catch (err) {
            error = err
        }

        return { document, error }

    }

    async getOneDish(dishID: string) {
        let document: DishesType | null = null
        let error: any = null
        try {
            document = await Dishes.findById(dishID).exec()
            if (!document) {
                throw { message: 'There is no dish by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async updateOneDish(dishID: string, updates: object) {
        let document: DishesType | null = null
        let error: any = null

        try {
            document = await Dishes.findByIdAndUpdate(dishID, { $set: updates }, { new: true }).exec()
            if (!document) {
                throw { message: 'There is no dish by this ID', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteOneDish(dishID: string) {
        let document: any = null
        let error: any = null

        try {
            let doc = await Dishes.findByIdAndDelete(dishID).exec()
            if (!doc) {
                throw { message: 'There is no dish by this ID', code: 404 }
            } else {
                document = doc
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async getAllComments(dishID: string) {
        let document: SubDocumentArray<any> | undefined | null = null
        let error: any = null

        try {
            let doc = await Dishes.findById(dishID)
            if (!doc) {
                throw { message: 'No such document exists', code: 404 }
            } else {
                document = doc.comments
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async createNewComment(dishID: string, parameters: { rating: number, description?: string, image?: string, category?: string }) {
        let document: DishesType | null = null
        let error: any = null

        try {
            document = await Dishes.findByIdAndUpdate(dishID, { $push: { comments: parameters } }, { new: true })
            if (!document) {
                throw { message: 'No such document exists', code: 404 }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteAllComments(dishID: string) {
        let document: any = null
        let error: any = null

        try {
            // Using seperate variable, because cannot figure out what is the type of doc
            let doc = await Dishes.findById(dishID).exec()
            if (!doc) {
                throw { message: 'No such document exists', code: 404 }
            } else {
                if (!doc.comments) {
                    throw { message: 'Document has no comments', code: 404 }
                } else {
                    // Removing every element from the code individually
                    while (doc.comments.length) {
                        doc.comments.pop()
                    }
                    doc.save()
                    document = doc
                }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async getOneComment(dishID: string, commentID: string) {
        let document: any = null
        let error: any = null

        try {
            let doc = await Dishes.findById(dishID)
            if (!doc) {
                throw { message: 'No such document exists', code: 404 }
            } else {
                if (!doc.comments || !doc.comments.id(commentID)) {
                    throw { message: "No such comment", code: 404 }
                } else {
                    document = doc.comments.id(commentID)
                }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async updateOneComment(dishID: string, commentID: string, parameters: { rating: number, description?: string, image?: string, category?: string }) {
        let document: any = null
        let error: any = null

        try {
            let doc = await Dishes.findById(dishID)
            if (!doc) {
                throw { message: 'No such document exists', code: 404 }
            } else {
                if (!doc.comments || !doc.comments.id(commentID)) {
                    throw { message: "No such comment", code: 404 }
                } else {
                    doc.comments.id(commentID).rating = parameters.rating
                    if (parameters.description) doc.comments.id(commentID).description = parameters.description
                    if (parameters.image) doc.comments.id(commentID).image = parameters.image
                    if (parameters.category) doc.comments.id(commentID).category = parameters.category
                    doc.save()
                    document = doc
                }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

    async deleteOneComment(dishID: string, commentID: string) {
        let document: any | null = null
        let error: any = null

        try {
            let doc = await Dishes.findById(dishID)
            if (!doc) {
                throw { message: 'No such document', code: 404 }
            } else {
                if (!doc.comments || !doc.comments.id(commentID)) {
                    throw { message: 'No such comment', code: 404 }
                } else {
                    doc.comments.id(commentID).remove()
                    doc.save()
                    document = doc
                }
            }
        } catch (err) {
            error = err
        }

        return { document, error }
    }

}

export default new DishService()