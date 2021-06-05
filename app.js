const express = require('express');
const app = express();
const path = require('path')

const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
const PORT = process.env.PORT || 8080

//Creates static home page
app.use(express.static(path.join(__dirname, 'public')))

//Middleware for parsing data
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))