const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);
