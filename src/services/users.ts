import User, { userType } from '../models/users'
import { ErrorWithStatus } from '../config/customTypes'

class Users {
    async createUser(username: string, password: string) {
        let result: any = null, error: ErrorWithStatus | null = null
        try {
            const userExists = await User.findOne({ username: username }).exec()
            if (userExists) {
                error = new Error('User already exists')
                error.status = 403
            } else {
                result = await User.create({ username, password })
            }
        } catch (err) {
            error = err
        }
        return { result, error }
    }
    async login(username: string, password: string) {
        let result: any = null, error: ErrorWithStatus | null = null
        try {
            const user = await User.findOne({ username }).exec()
            if (user == null) {
                error = new Error('User does not exist')
                error.status = 403
            } else if (user.password != password) {
                error = new Error('Invalid password')
                error.status = 403
            } else {
                result = user
            }
        } catch (err) {
            error = err
        }
        return { result, error }
    }
}

export default new Users()