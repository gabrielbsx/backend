import Mongoose from '@ioc:Adonis/Addons/Mongoose'

export interface TimestampDocument extends Mongoose.Document {
  createdAt: Date
  updatedAt?: Date
}

export const TimestampSchema = {
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
}
