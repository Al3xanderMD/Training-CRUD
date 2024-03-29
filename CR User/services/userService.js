let users = require('../data/user.json')
const { writeDataToFile } = require('../utils')

function getAllUsers(){
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function getUserById(id){
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id)
        resolve(user)
    })
}

async function createUser(user){
    return new Promise((resolve, reject) => {
        const newId = Math.floor(Math.random() * 1000) + 1
        const newUser = {
            id: newId,
            ...user
        }
        users.push(newUser)
        writeDataToFile('./data/user.json', users)
        resolve(newUser)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}