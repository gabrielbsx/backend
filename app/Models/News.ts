import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Users, { UserDocument } from './Users'
import Mongoose, { Schema, ObjectId } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'

export interface NewsDocument extends TimestampDocument {
  slug: string
  title: string
  description: string
  content: string
  category: string
  thumbnail: string
  user: UserDocument
}

const NewsSchema = new Schema<NewsDocument>({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ...TimestampSchema,
})

export default Mongoose.model<NewsDocument>('News', NewsSchema)
