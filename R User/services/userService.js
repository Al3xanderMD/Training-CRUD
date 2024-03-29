let users = require('../data/user.json')

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

module.exports = {
    getAllUsers,
    getUserById
}