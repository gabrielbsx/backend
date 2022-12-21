import { CharacterDocument } from './Character'
import Mongoose, { Schema, ObjectId } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'

export interface GuildDocument extends TimestampDocument {
  identifier: number
  name: string
  kingdom: 'Adventure' | 'Akelonia' | 'Hekalotia'
  fame: number
  city: string
  characters: CharacterDocument[]
}

const GuildSchema = new Schema<GuildDocument>({
  identifier: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  kingdom: {
    type: String,
    required: true,
  },
  fame: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
  ...TimestampSchema,
})

export default Mongoose.model<GuildDocument>('Guild', GuildSchema)
