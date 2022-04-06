import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../store/actions/user'

import { userService } from '../../../services/userService'


export const UserLog = () => {
    // CMP data
    const { user: loggedUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const onLogout = async () => {
        const isLoggedOut = await userService.logout()
        if (isLoggedOut) dispatch(logoutUser())
    }


    // CMP render
    return (
        <div>
            <span>Logged in as: {loggedUser.username ? loggedUser.username : 'null'}</span>

            {loggedUser._id && <span onClick={onLogout}>(Logout)</span>}
        </div>
    )
}