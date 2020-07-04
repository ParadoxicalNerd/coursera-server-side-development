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
const promotions_1 = __importDefault(require("../models/promotions"));
class PromotionService {
    getAllPromotions() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield promotions_1.default.find({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    createNewPromotion(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield promotions_1.default.create(parameters);
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteAllPromotions() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = {};
            let error = null;
            try {
                document = yield promotions_1.default.remove({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    getOnePromotion(promotionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield promotions_1.default.findById(promotionID).exec();
                if (!document) {
                    throw { message: 'There is no promotion by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    updateOnePromotion(promotionID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield promotions_1.default.findByIdAndUpdate(promotionID, { $set: updates }, { new: true }).exec();
                if (!document) {
                    throw { message: 'There is no promotion by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteOnePromotion(promotionID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield promotions_1.default.findByIdAndDelete(promotionID).exec();
                if (!doc) {
                    throw { message: 'There is no promotion by this ID', code: 404 };
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
}
exports.default = new PromotionService();
//# sourceMappingURL=promotions.js.map