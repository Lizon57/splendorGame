import { utilService } from './utilService'


function query(entityType) {
    const entities = JSON.parse(localStorage.getItem(entityType))
    if (entities.length > 0) return Promise.resolve(entities)
    else throw new Error('שגיאה בהתחברות לבסיס הנתונים')
}


async function getById(entityType, entityId) {
    try {
        const entities = await query(entityType)
        if (!entities.length) throw new Error('שגיאה בהתחברות לבסיס הנתונים')
        const entity = entities.find(entity => entity._id === entityId)
        if (entity) return entity
        else throw new Error('הפריט המבוקש לא נמצא')
    }
    catch (_err) {
        throw new Error('שגיאה בהתחברות לבסיס הנתונים')
    }
}


async function getByPageName(entityType, entityPageName) {
    try {
        const entities = await query(entityType)
        if (!entities.length) throw new Error('שגיאה בהתחברות לבסיס הנתונים')
        const entity = entities.find(entity => entity.pageInfo.name.pageName === entityPageName)
        if (entity) return entity
        else throw new Error('הפריט המבוקש לא נמצא')
    }
    catch (_err) {
        throw new Error('שגיאה בהתחברות לבסיס הנתונים')
    }
}


async function post(entityType, newEntity) {
    newEntity._id = utilService.makeId()
    try {
        let entities = await query(entityType)
        if (!entities.length) throw new Error('שגיאה בהתחברות לבסיס הנתונים')
        entities.push(newEntity)
        save(entityType, entities)
        return newEntity
    }
    catch (_err) {
        throw new Error('שגיאה בהתחברות לבסיס הנתונים')
    }
}


async function put(entityType, updatedEntity) {
    try {
        let entities = await query(entityType)
        if (!entities.length) throw new Error('שגיאה בהתחברות לבסיס הנתונים')
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx === -1) throw new Error('הפריט המבוקש לא נמצא בבסיס הנתונים')
        entities.splice(idx, 1, updatedEntity)
        save(entityType, entities)
        return updatedEntity
    }
    catch (_err) {
        throw new Error('שגיאה בהתחברות לבסיס הנתונים')
    }
}


async function remove(entityType, entityId) {
    try {
        let entities = await query(entityType)
        if (!entities.length) throw new Error('שגיאה בהתחברות לבסיס הנתונים')
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx === -1) throw new Error('הפריט המבוקש לא נמצא בבסיס הנתונים')
        entities.splice(idx, 1)
        save(entityType, entities)
        return entities
    }
    catch (_err) {
        throw new Error('שגיאה בהתחברות לבסיס הנתונים')
    }
}


function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}


export const storageService = {
    query,
    getById,
    getByPageName,
    post,
    put,
    remove,
    save
}