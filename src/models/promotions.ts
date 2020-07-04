import { createSchema, typedModel, Type, Extract } from 'ts-mongoose'

const documentName = 'promotions'

const promotionsSchema = createSchema({
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
    label: Type.string({
        required: true
    }),
    price: Type.number({
        required: true,
        min: 0
    }),
    featured: Type.boolean({
        default: false
    })
}, {
    timestamps: true
});

export default typedModel(documentName, promotionsSchema)
export type PromotionsType = Extract<typeof promotionsSchema>