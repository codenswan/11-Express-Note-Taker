//* dependencies and universals. The db.json is assigned to notes here so that it doesn't require fs.readFile in each separate app.get function.
let notesArray = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uniqueID = require("uniqid"); //* this dependency generates the id for the notes see https://www.npmjs.com/package/uniqid
const dir = path.join(__dirname, "../db/db.json");

//* exported api functions
module.exports = (app) => {
  //* gets all the save notes
  app.get("/api/notes", (req, res) => {
    res.json(notesArray);
  });

  //* creates new notes and pushes to notesArray and rewrites db.json
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqueID();
    notesArray.push(newNote);

    const data = JSON.stringify(notesArray, null, 2);
    try {
      fs.writeFileSync(dir, data);
      res.json(notesArray);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  });

  //* delets notes from the notesArray based on uniqueID. Filter method will rewrite db.json with a new array without the deleted note.
  app.delete("/api/notes/:id", (req, res) => {
    try {
      const noteIdToDelete = req.params.id;

      //* Filter method will rewrite db.json with a new array minus the deleted note.
      const filtered = notesArray.filter((note) => note.id != noteIdToDelete);
      notesArray = filtered;

      fs.writeFileSync(dir, JSON.stringify(filtered));
      res.json(filtered);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  });
};
