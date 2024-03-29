let posts = require('../data/post.json')
const { writeDataToFile } = require('../utils')

function getAllPosts(){
    return new Promise((resolve, reject) => {
        resolve(posts)
    })
}

function getPostById(id){
    return new Promise((resolve, reject) => {
        const post = posts.find(post => post.id === id)
        resolve(post)
    })
}

async function createPost(post){
    return new Promise((resolve, reject) => {
        const newId = Math.floor(Math.random() * 1000) + 1
        const newPost = {
            id: newId,
            ...post
        }
        posts.push(newPost)
        writeDataToFile('./data/post.json', posts)
        resolve(newPost)
    })
}

async function updatePost(id, post){
    return new Promise((resolve, reject) => {
        const index = posts.findIndex(post => post.id === id)
        posts[index] = {id, ...post}
        writeDataToFile('./data/post.json', posts)
        resolve(posts[index])
    })
}

async function deletePost(id){
    return new Promise((resolve, reject) => {
        posts = posts.filter(post => post.id !== id)
        writeDataToFile('./data/post.json', posts)
        resolve()
    })

}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getPostsByYear
}