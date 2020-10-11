const fs = require("fs");
const path = require("path");


function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};
// creates a new note


function createNewNote(newNote, notesArray) {
  // push new data to array
  notesArray.push(newNote);
  // write updated array to JSON
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notes: notesArray}, null, 2)
  );
  return notesArray;
};


// validates to accept or reject incoming data  
function validateNote(note) {
  if (!newNote.title || typeof newNote.title !== 'string') {
    return false;
  };
  if (!newNote.text || typeof newNote.text !== 'string') {
    return false;
  };
  if (!newNote.id  ||  typeof  newNote.id !== 'number') {
    return false;
  };

  return true;
};

module.exports = {
  findById,
  createNewNote,
  validateNote
};