const mongoose = require('mongoose');
//const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const specificationSchema = new mongoose.Schema({
  name : String,
  value : String,
})

const detailsSpec = new mongoose.Schema({
  category : String,
  specification : [specificationSchema]
})

const smartphoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A smartphone must have a name'],
      trim: true,
    },
   img : {
    type: String,
    required: [true, 'A smartphone must have an image']
   },
   fullDetails : [detailsSpec],
   quickSpecs : [detailsSpec]
   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Smartphone = mongoose.model('Smartphone', smartphoneSchema);

module.exports = Smartphone;
