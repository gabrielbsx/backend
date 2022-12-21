import Hash from '@ioc:Adonis/Core/Hash'
import { CharacterDocument } from './Character'
import Mongoose, { Schema } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'

type AccessLevel = 'User' | 'Moderator' | 'Admin'

export interface UserDocument extends TimestampDocument {
  name?: string
  email?: string
  username: string
  password: string
  rememberMeToken?: string
  accessLevel: AccessLevel
  characters?: CharacterDocument[]
  recovery?: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9]{4,10}+$/,
  },
  password: {
    type: String,
    required: true,
  },
  rememberMeToken: {
    type: String,
    required: false,
  },
  accessLevel: {
    type: String,
    enum: ['User', 'Moderator', 'Admin'],
    required: true,
  },
  characters: {
    type: [Schema.Types.ObjectId],
    ref: 'Character',
    required: false,
  },
  recovery: {
    type: String,
    required: false,
  },
  ...TimestampSchema,
})

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await Hash.make(user.password)
  }
  next()
})

export default Mongoose.model<UserDocument>('User', UserSchema)
