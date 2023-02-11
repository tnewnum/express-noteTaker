const express = require('express')
const path = require('path')
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

 app.listen(PORT, () =>
 console.log(`App is listening at http://localhost:${PORT}`))