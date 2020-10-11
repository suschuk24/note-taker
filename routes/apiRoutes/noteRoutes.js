const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { createNewNote, validateNote, findById } = require('../../lib/notes')

router.get('/notes', (req, res) => {
    const result = createNewNote(req.body, notes);
    
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });
  
router.get( '/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if(result) {
        res.json(result);
    } else {
        res.send( 404 );
    };
});

router.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
    res.status(400).send('This note is not properly formatted.');
    } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

module.exports = router;