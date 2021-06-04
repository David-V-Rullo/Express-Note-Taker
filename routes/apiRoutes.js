const router = require('express').Router()

const saveData = require('../db/saveData')

//GET appropriate routes

router.get('/notes', function (req, res) {
    saveData
        .retriveNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
})

router.post('/notes', (req, res) =>{
    saveData   
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err))
})


module.exports = router; 