import { userService } from '../../services/userService'

// Login user by id - for dev stage
export const loginUserById = id => {
    return async dispatch => {
        try {
            const user = await userService.getById(id)
            dispatch({ type: 'SET_USER', user })
        }
        catch (_err) {
            throw _err
        }
    }
}