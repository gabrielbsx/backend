import Mongoose, { Schema } from '@ioc:Adonis/Addons/Mongoose'
import { TimestampDocument, TimestampSchema } from 'App/Helpers/Models/Timestamp'
import { PackageDocument } from './Package'
import { UserDocument } from './Users'

export type Status =
  | 'pending'
  | 'paid'
  | 'complete'
  | 'canceled'
  | 'refund'
  | 'expired'
  | 'analysis'

export interface DonateDocument extends TimestampDocument {
  user: UserDocument
  package: PackageDocument
  method: string
  status: Status
  merchantOrder: string
  paymentId: string
  qrcode?: string
  paymentUrl: string
  authorizationId: string
  referenceId: string
}

const DonateSchema = new Schema<DonateDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: 'Package',
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'complete', 'canceled', 'refund', 'expired', 'analysis'],
    required: true,
  },
  merchantOrder: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  qrcode: {
    type: String,
    required: false,
  },
  paymentUrl: {
    type: String,
    required: true,
  },
  authorizationId: {
    type: String,
    required: true,
  },
  referenceId: {
    type: String,
    required: true,
  },
  ...TimestampSchema,
})

export default Mongoose.model<DonateDocument>('Donate', DonateSchema)
