import Dishes, { DishesType, a } from '../models/dishes'
import { SubDocumentArray } from 'ts-mongoose/types/_shared'

class DishService {
    async getAllDishes() {
        let document: DishesType[] | null = null
        let error: any = null

        try {
            const doc = await Dishes.find({}).populate('comments.author').exec()
            // doc.populate('comments.author').execPopulate()
            document = doc
        } catch (err) {
            error = err
        }

        return { document, error }
    }


    async createNewDish(parameters: object) {
        let document: DishesType | null = null
        let error: any = null

        try {
            document = await Dishes.create(parameters)
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
            document = await Dishes.findById(dishID).populate('comments.author').exec()
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
            let doc = await Dishes.findById(dishID).populate('comments.author')
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

    async createNewComment(dishID: string, parameters: { rating: number, description?: string, author: any }) {
        let document: DishesType | null = null
        let error: any = null

        try {
            document = await Dishes.findByIdAndUpdate(dishID, { $push: { comments: parameters } }, { new: true }).populate('comments.author')
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
            let doc = await Dishes.findById(dishID).populate('comments.author')
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

    async updateOneComment(dishID: string, commentID: string, parameters: { rating: number, description?: string, author: any }) {
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
                    doc.comments.id(commentID).author = parameters.author
                    if (parameters.description) doc.comments.id(commentID).description = parameters.description
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