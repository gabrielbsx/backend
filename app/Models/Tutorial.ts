import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'
import Mongoose, { Schema } from '@ioc:Adonis/Addons/Mongoose'

export interface TutorialDocument extends TimestampDocument {
  title: string
  category: string
  description: string
  slug: string
  thumbnail: string
  content: string
}

const TutorialSchema = new Schema<TutorialDocument>({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ...TimestampSchema,
})

export default Mongoose.model<TutorialDocument>('Tutorial', TutorialSchema)
