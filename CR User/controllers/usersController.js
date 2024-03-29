const users = require('../data/user.json')
const UserServices = require('../services/userService')
const { getPostData } = require('../utils')

const userIdRegex = /^\/api\/users\/[0-9]+$/;

const routeRequest = async (req, res) => {
    if (req.method === 'GET')
        await handleGetRequests(req, res);
    else if (req.method === 'POST')
        await handlePostRequests(req, res);
    // else if (req.method === 'PUT')
    //     handlePutRequests(req, res);
    // else if (req.method === 'DELETE')
    //     handleDeleteRequests(req, res);
}

const handleGetRequests = async (req, res) => {
    if (req.url === '/api/users') {
        await getAllUsers(req, res);
    } else if (req.url.match(userIdRegex)) {
        await getUserById(req, res);
    }
}

const handlePostRequests = async (req, res) => {
    if (req.url === '/api/users') {
        await createUser(req, res);
    }
}

const createUser = async (req, res) => {
    try {
        const body = await getPostData(req)

        const { name, email, phone } = JSON.parse(body)

        const user = {
            name,
            email,
            phone
        }

        const newUser = await UserServices.createUser(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))
    } catch (err) {
        console.log(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserServices.getAllUsers()

        res.writeHead(200, "ok", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } catch (err) {
        res.writeHead(500, "Internal Server Error", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal Server Error' }))
    }
}

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.url.split('/')[3])
        const user = await UserServices.getUserById(id)

        console.log(user)
        if (user) {
            res.writeHead(200, "ok", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        } else {
            res.writeHead(404, "Not Found", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User not found' }))
        }
    }
    catch (err) {
        console.log(err)
        res.writeHead(409, "Bad Request", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'User id not in correct format' }))
    }
}

module.exports = {
    routeRequest
}