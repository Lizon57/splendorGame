import { useDispatch, useSelector } from 'react-redux'
import { loginUserById } from '../../../store/actions/user'

import { userDB } from '../../../data/userDB'


export const UserLog = () => {
    // CMP data
    const { user: loggedUser } = useSelector(state => state.userModule)
    const dispatch = useDispatch()


    // CMP functions
    const onLoginById = async id => {
        try {
            dispatch(loginUserById(id))
        }
        catch (_err) {
            console.log(_err)
        }
    }

    const onLogout = () => dispatch({ type: 'SET_USER', user: {} })



    // CMP render
    return (
        <div>
            {<span>Logged in as: {loggedUser.name ? loggedUser.name.display : 'null'} |</span>}

            {userDB.map(user => (
                <span key={user._id} onClick={() => onLoginById(user._id)}> {user.name.display} </span>))}

            {loggedUser._id && <span onClick={onLogout}>(Logout)</span>}
        </div>
    )
}