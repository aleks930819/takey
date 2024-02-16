import mongoose from 'mongoose';
import { TOKEN_TYPES } from '../constants';

const TokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: [TOKEN_TYPES.ACCESS, TOKEN_TYPES.REFRESH],
      required: true
    },
    expires: { type: Date, required: true },
    blacklisted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Token = mongoose.model('Token', TokenSchema);

export default Token;
