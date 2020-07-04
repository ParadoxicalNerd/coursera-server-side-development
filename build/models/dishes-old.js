"use strict";
// "use strict";
// var mongoose = require("mongoose");
// require('mongoose-currency').loadType(mongoose)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('mongoose-currency').loadType(mongoose_1.default);
const documentName = 'dishes';
const Schema = mongoose_1.default.Schema;
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });
const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model(documentName, dishSchema);
//# sourceMappingURL=dishes-old.js.map