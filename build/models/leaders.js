"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const documentName = 'leaderships';
const leaderSchema = ts_mongoose_1.createSchema({
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
    designation: ts_mongoose_1.Type.string({
        required: true
    }),
    abbr: ts_mongoose_1.Type.string({
        required: true
    }),
    featured: ts_mongoose_1.Type.boolean({
        default: false
    })
}, {
    timestamps: true
});
exports.default = ts_mongoose_1.typedModel(documentName, leaderSchema);
//# sourceMappingURL=leaders.js.map