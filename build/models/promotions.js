"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const documentName = 'promotions';
const promotionsSchema = ts_mongoose_1.createSchema({
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
    label: ts_mongoose_1.Type.string({
        required: true
    }),
    price: ts_mongoose_1.Type.number({
        required: true,
        min: 0
    }),
    featured: ts_mongoose_1.Type.boolean({
        default: false
    })
}, {
    timestamps: true
});
exports.default = ts_mongoose_1.typedModel(documentName, promotionsSchema);
//# sourceMappingURL=promotions.js.map