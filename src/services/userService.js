import { userDB } from '../data/userDB'

import { storageService } from './storageService'


const STORAGE_KEY = 'userDB'


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



export const userService = {
    query,
    getById
}