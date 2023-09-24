const mongoose = require('mongoose')

const Schema = mongoose.Schema

const generatorSchema = new Schema({
  generatorID: {
    type: String,
    required: true,
    unique: true
  },
  sectionNumber: {
    type: String,
    required: true
  },
  Voltage: {
    type: String,
    required: true
  },
  fuelNeed: {
    type: String,
    required: true
  },
  maintainedTimes: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Inactive'
  }
})

module.exports = mongoose.model('Generator', generatorSchema)
