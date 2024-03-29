const postsService = require('../services/postService')
const { getPost, getPostsByUser } = require("../services/postService");
const userService = require("../services/userService");
const { getPostData } = require('../utils')

const postIdRegex = /^\/api\/posts\/[0-9]+$/;

const routeRequest = async (req, res) => {
    if (req.method === 'GET')
        await handleGetRequests(req, res);
    else if (req.method === 'POST')
        await handlePostRequests(req, res);
    /*else if (req.method === 'PUT')
        handlePutRequests(req, res);
    else if (req.method === 'DELETE')
        handleDeleteRequests(req, res);*/
}

const handleGetRequests = async (req, res) => {
    if (req.url.match(postIdRegex)) {
        await getPostById(req, res)
    }
    else if (req.url.startsWith('/api/posts/year=')) {
        await getPostsByYear(req, res)
    }
    else {
        res.writeHead(404, "Not found", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Endpoint not found' }))
    }
}

const handlePostRequests = async (req, res) => {
    if (req.url === '/api/posts') {
        await createPost(req, res);
    }
}

const createPost = async (req, res) => {
    try {
        const body = await getPostData(req);
        const { topic, description, year } = JSON.parse(body);

        const post = {
            topic,
            description,
            year
        }

        const newPost = await postsService.createPost(post);
        res.writeHead(201, "Created", { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newPost));
    } catch (err) {
        console.log(err);
        res.writeHead(400, "Bad request", { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid post data' }));
    }
}

const getPostById = async (req, res) => {
    try {
        const id = parseInt(req.url.split('/')[3]);
        const post = await postsService.getPostById(id)

        if (post) {
            res.writeHead(200, "ok", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(post))
        } else {
            res.writeHead(404, "Not Found", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Post not found' }))
        }
    } catch (err) {
        console.log(err)
        res.writeHead(400, "Bad request", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Post id not in correct format' }))
    }
}

const getPostsByYear = async (req, res) => {
    try {
        const yearNumber = req.url.split('/')[3];
        const year = parseInt(yearNumber.split('=')[1])

        if (year) {
            const posts = await postsService.getPostsByYear(year);
            res.writeHead(200, "ok", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(posts))
        } else {
            res.writeHead(404, "Not Found", { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Posts not found' }))
        }
    } catch (err) {
        console.log(err)
        res.writeHead(400, "Bad request", { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Year not in correct format' }))
    }
}

module.exports = {
    routeRequest
}