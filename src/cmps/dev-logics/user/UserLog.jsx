import { useDispatch, useSelector } from 'react-redux'

import { userDB } from '../../../data/userDB'
import { userService } from '../../../services/userService'


export const UserLog = () => {
    // CMP data
    const { user: loggedUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const onLogUser = async id => {
        try {
            const user = await userService.getById(id)
            dispatch({ type: 'SET_USER', payload: user })
        }
        catch (_err) {
            console.log(_err)
        }
    }


    // CMP render
    return (
        <div>
            {loggedUser._id && <span>Logged: {loggedUser.name.display} |</span>}

            {userDB.map(user => (
                <span key={user._id} onClick={() => onLogUser(user._id)}> {user.name.display} </span>))}
        </div>
    )
}