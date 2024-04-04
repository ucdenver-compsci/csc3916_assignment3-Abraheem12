var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect(process.env.DB);

// Movie schema
var MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  releaseDate: String,
  genre: {
    type: String,
    enum: [
      "Action",
      "Adventure",
      "Science Fiction",
      "Drama",
      "Comedy",
      "Horror",
      "Mystery",
      "Thriller",
    ],
  },
  actors: [{
    actorName: String,
    characterName: String,
  }],
});

// return the model
module.exports = mongoose.model("Movie", MovieSchema);