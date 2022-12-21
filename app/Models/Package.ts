import Mongoose, { Schema } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'

export interface ItemEffect {
  effect: number
  value: number
}

export interface Item {
  id: number
  effects: ItemEffect[]
}

export interface PackageDocument extends TimestampDocument {
  name: string
  slug: string
  price: number
  bonus: number
  donate: number
  items?: Item[]
}

const PackageSchema = new Schema<PackageDocument>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    required: true,
  },
  donate: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  ...TimestampSchema,
})

export default Mongoose.model<PackageDocument>('Package', PackageSchema)
