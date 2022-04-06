const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')


async function login(username, password) {
    logger.debug('Auth - service.login - login req by', username)
    const user = await userService.getByUsername(username)
    if (!user) {
        logger.error('Auth - service.login - Invalid username or password')
        throw 'Invalid username or password'
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        logger.error('Auth - service.login - Invalid username or password')
        throw 'Invalid username or password'
    }

    delete user.password
    return user
}

async function signup(username, password, fullname, isGoogle = null) {
    logger.debug('Auth - service.signup - Request signup from', username)
    if (!username || !password || !fullname) {
        logger.error('Auth - service.signup - Unvaliad req. Username || password || fullname are required')
        throw 'Fullname, username and password are required!'
    }

    const saltRounds = 10
    const user = await userService.getByUsername(username)
    // Google user is already signedup - Redirects to login
    if (isGoogle && user) {
        login(username, password)
        return user
    }

    password = await bcrypt.hash(password, saltRounds)
    return await userService.add({ username, password, fullname, isGoogle })
}

module.exports = {
    signup,
    login,
}