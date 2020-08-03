let notes = require("../db/db.json");
const path = require("path");
const fs = require("fs");
const uniqueID = require("uniqid");
const dir = path.join(__dirname, "../db/db.json");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uniqueID();
    notes.push(newNote);

    const data = JSON.stringify(notes, null, 2);
    try {
      fs.writeFileSync(dir, data);
      res.json(notes);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  });

  app.delete("/api/notes/:id", (req, res) => {
    try {
      const noteIdToDelete = req.params.id;

      const filtered = notes.filter((note) => note.id != noteIdToDelete);
      notes = filtered
      
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
