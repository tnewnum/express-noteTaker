const express = require('express')
const path = require('path')
const { readFromFile, readAndAppend} = require('./helpers/fsUtils')
const uuid = require('./helpers/uuid')
const app = express()
const PORT = process.env.PORT || 3001

//middleware?
app.use(express.static('public'))
app.use(express.json())
//allows express to understand : in the route 
app.use(express.urlencoded({extended: true}))

//res.render("idex")
//get route for homepage
app.get('/', (req, res) =>
res.sendFile(path,join(__dirname, '/public/index.html'))
)

//get route for notes.html 
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html' ))
)

//get route for db.json
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

//post request 
app.post('/api/notes', (req, res) => {
res.json(`${req.method} request received`)

    const { title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            tip_id: uuid(),
        }

        readAndAppend(newNote, './db/db.json')
        console.log(`Note added successfully!`)
    } else {
        console.log(`Error in adding note!`)
    }

})


app.listen(PORT, () =>
console.log(`App is listening at http://localhost:${PORT}`))