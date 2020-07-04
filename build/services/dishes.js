"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dishes_1 = __importDefault(require("../models/dishes"));
class DishService {
    getAllDishes() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield dishes_1.default.find({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    createNewDish(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield dishes_1.default.create({ name: parameters.name, description: parameters.description });
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteAllDishes() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = {};
            let error = null;
            try {
                document = yield dishes_1.default.remove({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    getOneDish(dishID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield dishes_1.default.findById(dishID).exec();
                if (!document) {
                    throw { message: 'There is no dish by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    updateOneDish(dishID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield dishes_1.default.findByIdAndUpdate(dishID, { $set: updates }, { new: true }).exec();
                if (!document) {
                    throw { message: 'There is no dish by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteOneDish(dishID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield dishes_1.default.findByIdAndDelete(dishID).exec();
                if (!doc) {
                    throw { message: 'There is no dish by this ID', code: 404 };
                }
                else {
                    document = doc;
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    getAllComments(dishID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield dishes_1.default.findById(dishID);
                if (!doc) {
                    throw { message: 'No such document exists', code: 404 };
                }
                else {
                    document = doc.comments;
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    createNewComment(dishID, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield dishes_1.default.findByIdAndUpdate(dishID, { $push: { comments: parameters } }, { new: true });
                if (!document) {
                    throw { message: 'No such document exists', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteAllComments(dishID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                // Using seperate variable, because cannot figure out what is the type of doc
                let doc = yield dishes_1.default.findById(dishID).exec();
                if (!doc) {
                    throw { message: 'No such document exists', code: 404 };
                }
                else {
                    if (!doc.comments) {
                        throw { message: 'Document has no comments', code: 404 };
                    }
                    else {
                        // Removing every element from the code individually
                        while (doc.comments.length) {
                            doc.comments.pop();
                        }
                        doc.save();
                        document = doc;
                    }
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    getOneComment(dishID, commentID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield dishes_1.default.findById(dishID);
                if (!doc) {
                    throw { message: 'No such document exists', code: 404 };
                }
                else {
                    if (!doc.comments || !doc.comments.id(commentID)) {
                        throw { message: "No such comment", code: 404 };
                    }
                    else {
                        document = doc.comments.id(commentID);
                    }
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    updateOneComment(dishID, commentID, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield dishes_1.default.findById(dishID);
                if (!doc) {
                    throw { message: 'No such document exists', code: 404 };
                }
                else {
                    if (!doc.comments || !doc.comments.id(commentID)) {
                        throw { message: "No such comment", code: 404 };
                    }
                    else {
                        doc.comments.id(commentID).rating = parameters.rating;
                        if (parameters.description)
                            doc.comments.id(commentID).description = parameters.description;
                        if (parameters.image)
                            doc.comments.id(commentID).image = parameters.image;
                        if (parameters.category)
                            doc.comments.id(commentID).category = parameters.category;
                        doc.save();
                        document = doc;
                    }
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteOneComment(dishID, commentID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield dishes_1.default.findById(dishID);
                if (!doc) {
                    throw { message: 'No such document', code: 404 };
                }
                else {
                    if (!doc.comments || !doc.comments.id(commentID)) {
                        throw { message: 'No such comment', code: 404 };
                    }
                    else {
                        doc.comments.id(commentID).remove();
                        doc.save();
                        document = doc;
                    }
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
}
exports.default = new DishService();
//# sourceMappingURL=dishes.js.map