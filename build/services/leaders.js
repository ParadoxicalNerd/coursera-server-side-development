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
const leaders_1 = __importDefault(require("../models/leaders"));
class Leaderservice {
    getAllLeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield leaders_1.default.find({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    createNewLeader(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield leaders_1.default.create(attributes);
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteAllLeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = {};
            let error = null;
            try {
                document = yield leaders_1.default.remove({}).exec();
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    getOneLeader(leaderID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield leaders_1.default.findById(leaderID).exec();
                if (!document) {
                    throw { message: 'There is no leader by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    updateOneLeader(leaderID, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                document = yield leaders_1.default.findByIdAndUpdate(leaderID, { $set: updates }, { new: true }).exec();
                if (!document) {
                    throw { message: 'There is no leader by this ID', code: 404 };
                }
            }
            catch (err) {
                error = err;
            }
            return { document, error };
        });
    }
    deleteOneLeader(leaderID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document = null;
            let error = null;
            try {
                let doc = yield leaders_1.default.findByIdAndDelete(leaderID).exec();
                if (!doc) {
                    throw { message: 'There is no leader by this ID', code: 404 };
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
exports.default = new Leaderservice();
//# sourceMappingURL=leaders.js.map