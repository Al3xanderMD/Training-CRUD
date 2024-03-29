const userController = require('./controllers/usersController')
const postController = require('./controllers/postsController')

const http = require('http')

const server = http.createServer(async (req, res) => {
    try {
        if (req.url.startsWith('/api/users')) {
            await userController.routeRequest(req, res)
        } else if (req.url.startsWith('/api/posts')) {
            await postController.routeRequest(req, res)
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify("Route not found"))
        }
    }
    catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))