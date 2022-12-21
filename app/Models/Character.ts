import Mongoose, { Schema, ObjectId } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'

export interface ItemEffect {
  effect: number
  value: number
}

export interface Item {
  id: number
  slot: number
  effects: ItemEffect[]
}

export type Class = 'TransKnight' | 'Foema' | 'BeastMaster' | 'Huntress'
export type Evolution = 'Mortal' | 'Arch' | 'Celestial' | 'SubCelestial'
export type Kingdom = 'Akelonia' | 'Hekalotia' | 'Adventure'
export type Server = 'Beta Closed' | 'Beta Open' | 'Live'

export interface CharacterDocument extends TimestampDocument {
  user?: ObjectId
  guild?: ObjectId
  slot: number
  nick: string
  level: number
  class: Class
  evolution: Evolution
  guildLevel: number
  experience: number
  kills: number
  deaths: number
  elo: number
  subCharacter: CharacterDocument
  kingdom?: Kingdom
  server: Server
  frags: number
  inventory?: Item[]
  equipment?: Item[]
}

const CharacterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guild: {
    type: Schema.Types.ObjectId,
    ref: 'Guild',
    required: false,
  },
  slot: {
    type: Number,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    enum: ['TransKnight', 'Foema', 'BeastMaster', 'Huntress'],
    required: true,
  },
  evolution: {
    type: String,
    enum: ['Mortal', 'Arch', 'Celestial', 'SubCelestial'],
    required: true,
  },
  guildLevel: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  kills: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  elo: {
    type: Number,
    required: true,
  },
  subCharacter: {
    type: Schema.Types.ObjectId,
    ref: 'Character',
    required: false,
  },
  kingdom: {
    type: String,
    enum: ['Akelonia', 'Hekalotia', 'Adventure'],
    required: false,
  },
  server: {
    type: String,
    enum: ['Beta Closed', 'Beta Open', 'Live'],
    required: true,
  },
  frags: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Array,
    required: false,
  },
  equipment: {
    type: Array,
    required: false,
  },
  ...TimestampSchema,
})

export default Mongoose.model<CharacterDocument>('Character', CharacterSchema)
