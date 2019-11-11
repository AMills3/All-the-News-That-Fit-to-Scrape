let mongoose = require("mongoose");

let Schema = mongoose.Schema;

// Creating new object
let NoteSchema = new Schema({
  title: String,
  body: String
});

// Creating model
let Note = mongoose.model("Note", NoteSchema);

// Exporting the model
module.exports = Note;