const fs = require('fs')

function writeDataToFile(fileName, content){
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf-8', (err) => {
        if(err){
            console.log(err)
        }
    })
}
function generateRandomId(){
    return Math.floor(Math.random() * 10000)
}

function getPostData(req){
    return new Promise((resolve, reject) => {
        try{
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (error){
            reject(err)
        }
    })
}


module.exports = {
    writeDataToFile,
    getPostData
}