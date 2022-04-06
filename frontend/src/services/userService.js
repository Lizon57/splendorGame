import { userDB } from '../data/userDB'

import { httpService } from './httpService'
import { storageService } from './storageService'


const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedUser'



async function query(isFirstRun = true) {
    try {
        let users = await storageService.query(STORAGE_KEY)
        if (!users.length) {
            _createUserDB()
            users = userDB
        }

        return users
    }
    catch (_err) {
        if (isFirstRun) {
            _createUserDB()
            query(false)
            return
        }

        throw _err
    }
}


async function getById(id) {
    try {
        return await storageService.getById(STORAGE_KEY, id)
    }
    catch (_err) {
        throw _err
    }
}


function _createUserDB() {
    storageService.save('userDB', userDB)
}


async function login(credentials) {
    try {
        const user = await httpService.post(`/api/auth/login`, credentials)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    } catch (_err) {
        console.log(_err)
    }
}


async function signup(credentials) {
    try {
        const user = await httpService.post(`/api/auth/signup`, credentials)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    } catch (_err) {
        console.log(_err)
    }
}

async function logout() {
    try {
        await httpService.post(`/api/auth/logout`)
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        return true
    } catch (_err) {
        console.log(_err)
    }
}



export const userService = {
    query,
    getById,
    login,
    signup,
    logout
}