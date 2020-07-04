import { createSchema, typedModel, Type, Extract } from 'ts-mongoose'

const documentName = 'leaderships'

const leaderSchema = createSchema({
    name: Type.string({
        required: true,
        unique: true
    }),
    description: Type.string({
        required: true
    }),
    image: Type.string({
        required: true
    }),
    designation: Type.string({
        required: true
    }),
    abbr: Type.string({
        required: true
    }),
    featured: Type.boolean({
        default: false
    })
}, {
    timestamps: true
});

export default typedModel(documentName, leaderSchema)
export type LeadersType = Extract<typeof leaderSchema>