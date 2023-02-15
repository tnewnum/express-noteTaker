const express = require('express')
const path = require('path')
const fs = require('fs')
const uuid = require('./helpers/uuid')
const app = express()
const PORT = process.env.PORT || 3001
let db = require('./db/db.json')


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

//renders saved notes to the left of the page
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data))
    })
});

//post the newley added note to the left of the page
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request recieved`)

    const { title, text } = req.body


    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuid()
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            } else {
                const parsedNotes = JSON.parse(data)                
                parsedNotes.push(newNote)

                const noteString = JSON.stringify(parsedNotes, null, 2);

                fs.writeFile('./db/db.json', noteString, (err) =>
                    err
                    ? console.error(err)
                    : console.log(`Note for ${newNote.title} has been written to the JSON file!`)
                
                )
            }
        })

        const response = {
            status: 'success',
            body: newNote,
        }
        console.log(response)
        res.status(201).json(response)
    }else{
        res.status(500).json('Error in posting note!')
    }
}); 



//trying to get a note to delete
app.delete('/api/notes/:id', (req, res) => {
    
//needs to get the user provided ID 
const noteId = req.params.id 
console.log(noteId)

console.log(db)
db = db.filter(function(note){

    
    return note.id !== noteId

})



console.log(db)
fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>

    err
    ? console.error(err)
    : console.log(`Note deleted from the JSON file!`)
               
    )

res.sendStatus(200)

})




//wild card to catch any bad route request
app.get("*", (req, res) => {
    res.send("Sorry, this page doesn't exist.");
  });
  

//listening to start the port at launch
app.listen(PORT, () =>
console.log(`App is listening at http://localhost:${PORT}`))
