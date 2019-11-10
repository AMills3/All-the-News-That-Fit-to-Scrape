// Require mongoose
let mongoose = require("mongoose");

// Create Schema
let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: { 
        type: String,
        unique: true, 
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
      }
});

// Create article model
let Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
