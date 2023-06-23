const path = require('path')

const express = require('express')
const app = express()

const files = {
    n: ['N.html'],
    pages: ['page1.html', 'page2.html']
}
const pathToStaticDir = __dirname + '/static'
app.use(express.json())
app.use(express.static(pathToStaticDir))


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/', (req, res) => {
    const data = req.body.url
    res.send(files[data])
})


app.get('/pages/:filename', (req, res) => {
    const filename = req.params.filename
    res.sendFile(path.join(__dirname, '/pages', `/${filename}`))
})

app.listen(4000)
