const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        logger.error(`While finding user ${userId}`, err)
        throw err
    }
}


async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`Cannot update user ${user._id}`, err)
        throw err
    }
}


async function add(user) {
    logger.debug('User - service.add - Signup req:', user.username)
    try {
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            activeGameIds: [],
            stats: {
                win: 0,
                loose: 0,
                point: 100
            }
        }

        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('User - service.add - Can\'t insert user', err)
        throw err
    }
}


async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        logger.debug('User - service.getByUsername - Find:', username)
        return user
    } catch (err) {
        logger.error(`User - service.getByUsername - While finding ${username}:`, err)
        throw err
    }
}


module.exports = {
    getById,
    update,
    add,
    getByUsername
}