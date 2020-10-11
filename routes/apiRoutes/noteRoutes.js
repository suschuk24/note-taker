const router = require('express').Router();
const notes = require('../../db/db.json');
const { createNewNote, validateNote, findById } = require('../../lib/notes')
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

router.get('/notes', (req, res) => {
    const result = notes;
    
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
  
router.get( '/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if(result) {
        res.json(result);
    } else {
        res.send(404);
    };
});

router.post('/notes', (req, res) => {
    let noteId = uuidv4()

    let newNote = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    }

    notes.push(newNote)

    res.json(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (
        err
      ) {
        if (err) throw err;
      });
    });

module.exports = router;