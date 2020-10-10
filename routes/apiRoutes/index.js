const router = require('express').Router();
const { notes } = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not properly formatted.');
    } else {
      const animal = createNewAnimal(req.body, animals);
      res.json(animal);
    }
  });

module.exports = router;