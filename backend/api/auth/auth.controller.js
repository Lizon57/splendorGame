const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const { username, password, fullname, imgUrl, isGoogle } = req.body
        logger.debug('Auth - controller.signup - New signup request:', username)
        let user = await authService.signup(username, password, fullname, imgUrl, isGoogle)
        if (!user._id) user = await authService.login(username, password)
        logger.debug('Auth - controller.signup - Logged in:', username)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Auth - controller.signup - Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}