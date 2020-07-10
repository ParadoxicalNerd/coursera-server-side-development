import { createSchema, typedModel, Type, Extract } from 'ts-mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const documentName = 'users'

const userSchema = createSchema({
    firstName: Type.string({
        default: ''
    }),
    lastName: Type.string({
        default: ''
    }),
    googleId: Type.string(),
    admin: Type.boolean({
        default: false
    })
})
userSchema.plugin(passportLocalMongoose)

export default typedModel(documentName, userSchema)
export type userType = Extract<typeof userSchema>