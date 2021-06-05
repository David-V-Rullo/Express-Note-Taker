const util = require('util')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

//Uses the util module to make fs generate promises and returns: Better than fs sync. 
const readNote = util.promisify(fs.readFile)
const writeNote = util.promisify(fs.writeFile)

class Save {
    write(note){
        return writeNote('db/db.json', JSON.stringify(note))
    }
    read(){
        return readNote('db/db.json', 'utf8')
    }
    retreiveNotes() {
        return this.read()
            .then(res => {
                //Creates an empty notes variable
                let parsedNotes;
                try {
                    parsedNotes = [].concat(JSON.parse(res))
                }
                catch(err) {
                    //If the retrive notes function returns no data, then just make parsedNotes an empty array
                    parsedNotes = []
                }
                return parsedNotes
            })
    }
    addNote(note) {
        //Using object restructuring to make title and text variables from the passed in object {note} from the POST request
        const {title, text} = note
        if (!title || !text) {
            throw new Error('Notes require a title and text')
        }
        //creates the new note object and adds a unique id using uuid
        const newNote = {title, text, id:uuidv4()}

        return this.retreiveNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote)
    }
}

module.exports = new Save()