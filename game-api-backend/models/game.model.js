const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
  imageUrl: String,
  releaseDate: Date,
  publisher: String,
  rating: Number
}, {
  timestamps: true,
  toJSON: {
    virtuals: true, 
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;             
      delete ret.__v;             
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model("Game", GameSchema);