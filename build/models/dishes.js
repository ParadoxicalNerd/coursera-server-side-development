"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const documentName = 'dishes';
const commentSchema = ts_mongoose_1.createSchema({
    rating: ts_mongoose_1.Type.number({
        min: 1,
        max: 5,
        required: true
    }),
    description: ts_mongoose_1.Type.string({
        required: false,
    }),
    image: ts_mongoose_1.Type.string({
        required: false
    }),
    category: ts_mongoose_1.Type.string({
        required: false
    })
}, { timestamps: true });
const dishSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({
        required: true,
        unique: true
    }),
    description: ts_mongoose_1.Type.string({
        required: true
    }),
    image: ts_mongoose_1.Type.string({
        required: true
    }),
    category: ts_mongoose_1.Type.string({
        required: true
    }),
    label: ts_mongoose_1.Type.string({
        required: true
    }),
    price: ts_mongoose_1.Type.number({
        required: true,
        min: 0
    }),
    featured: ts_mongoose_1.Type.boolean({
        default: false
    }),
    comments: ts_mongoose_1.Type.array().of(commentSchema)
}, {
    timestamps: true
});
exports.default = ts_mongoose_1.typedModel(documentName, dishSchema);
//# sourceMappingURL=dishes.js.map