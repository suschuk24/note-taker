const router = require('express').Router();
const notes = require('../../db/db.json');
const { createNewNote, validateNote, findById } = require('../../lib/notes')
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// retrieve note info from db.json
router.get('/notes', (req, res) => {
    const result = notes;
    
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
// ability to find notes by ID for delete function.   
router.get( '/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if(result) {
        res.json(result);
    } else {
        res.send(404);
    };
});

// collect user input data, store and write to page and db.json
router.post('/notes', (req, res) => {
    let noteId = uuidv4()

    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    }
    // update sent to array
    notes.push(newNote)
    // update sent to db.json
    res.json(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
      });
    });

router.delete("/notes/:id", (req, res) => {
    //find the id of the note that is going to be deleted
    let deleteNote = notes.findIndex((item) => item.id === req.params.id);
    //remove the note from the notes array
    notes.splice(deleteNote, 1);
    
    //write the updated array to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
    });
    res.json({ deletion: "Note Deleted!" });
    });

module.exports = router;