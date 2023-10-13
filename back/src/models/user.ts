import mongoose, { Schema, Document, Error } from 'mongoose'
import * as bcrypt from 'bcrypt-nodejs';

interface UI {
  firstName: string,
  profileImage: string,
}

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  profileImage: {
    type: String,
    default: null
  },
},
  {
    versionKey: false,
    timestamps: true
  });
const Users = mongoose.model<UI>("User", UserSchema);
export default Users
