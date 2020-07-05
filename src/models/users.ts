import { createSchema, typedModel, Type, Extract } from 'ts-mongoose'

const documentName = 'users'

const userSchema = createSchema({
    username: Type.string({
        required: true,
        uniqure: true
    }),
    password: Type.string({
        required: true
    }),
    admin: Type.boolean({
        default: false
    })
})

export default typedModel(documentName, userSchema)
export type userType = Extract<typeof userSchema>