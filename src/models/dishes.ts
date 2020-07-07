import tsMongoose, { createSchema, typedModel, Type, Extract } from 'ts-mongoose'

const documentName = 'dishes'

const commentSchema = createSchema({
    rating: Type.number({
        min: 1,
        max: 5,
        required: true
    }),
    description: Type.string({
        required: false,
    }),
    author: Type.objectId({
        required: true,
        ref: 'users'
    })
}, { timestamps: true });

const dishSchema = createSchema({
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
    category: Type.string({
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
    }),
    comments: Type.array().of(commentSchema)
}, {
    timestamps: true
});

export default typedModel(documentName, dishSchema, documentName)
export type DishesType = Extract<typeof dishSchema>
// export {DishFunction} = typedModel
export type a = Extract<typeof typedModel>