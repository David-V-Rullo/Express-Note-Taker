const express = require('express');
const app = express();
const path = require('path')

const PORT = process.env.PORT || 8080

//Creates static home page
app.use(express.static(path.join(__dirname, 'public')))

//Middleware for parsing data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))}
//     )

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))