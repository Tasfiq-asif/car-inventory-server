import { model, Schema } from 'mongoose'

interface IBlacklistedToken {
  token: string
  expiresAt: Date
}

const blacklistedTokenSchema = new Schema<IBlacklistedToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
})

const BlacklistedToken = model<IBlacklistedToken>(
  'BlacklistedToken',
  blacklistedTokenSchema
)
export default BlacklistedToken
