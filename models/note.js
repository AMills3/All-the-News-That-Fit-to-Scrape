var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Creating new object
var NoteSchema = new Schema({
  title: String,
  body: String
});

// Creating model
var Note = mongoose.model("Note", NoteSchema);

// Exporting the model
module.exports = Note;