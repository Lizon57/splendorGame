import GoogleLogin from 'react-google-login'

import { useDispatch } from 'react-redux'

import { userService } from '../../services/userService'
import { loginUser } from '../../store/actions/user'


export const AppHeader = () => {
    const dispatch = useDispatch()

    const onLogin = async res => {
        if (res.error) {
            console.log(res.error)
            return
        }

        const credentials = {
            fullname: res.profileObj.name,
            username: res.profileObj.email,
            password: res.profileObj.googleId,
            imgUrl: res.profileObj.imageUrl,
            isGoogle: true
        }


        const user = await userService.signup(credentials)
        if (user) dispatch(loginUser(user))
        else console.log('failll')
    }


    return (
        <header>
            <GoogleLogin
                clientId="167025445197-5s9a42mb1udm8ivdlttvs1ro7djg898h.apps.googleusercontent.com"
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className='not-yet'
                    >
                        Google login
                    </button>
                )}
                onSuccess={onLogin}
                onFailure={onLogin}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </header>
    )
}