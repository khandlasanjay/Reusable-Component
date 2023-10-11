import mongoose, { Schema, Document, Error } from 'mongoose'
import * as bcrypt from 'bcrypt-nodejs';

export type UserDocument = Document & {
  email: string;
  password: string;
};

interface UI {
  firstName: string,
  isAdmin:boolean,
  lastName: string,
  email: string,
  contactNumber: string,
  otpCode: number,
  password: string,
  profileImage: string,
  deviceType: string,
  deviceToken: string,
  resetToken: string,
  deviceId: string,
  socialId: string,
  accessToken: string,
  signupType: string,
  status: string
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default : false,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  contactNumber: {
    type: String,
    default:'',
    unique: true,
    required: true,
  },
  otpCode: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null
  },
  deviceType: {
    type: String,
    default:null
  },
  deviceToken: {
    type: String,
    default: null
  },
  resetToken: {
    type: String,
    default: null
  },
  deviceId: {
    type: String,
    default: ''
  },
  socialId: {
    type: String,
    default: ''
  },
  accessToken: {
    type: String,
    default:null
  },
  signupType: {
    type: String,
    enum: ['F', 'G', 'A', 'N'],
    default: 'N'
  },
  status: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active'
  },
},
  {
    versionKey: false,
    timestamps: true
  });

type comparePasswordFunction = (passwordAttempt: string, cb: (err: any, isMatch: any) => void) => void;

UserSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (error: Error, hash: string) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

UserSchema.methods.comparePassword = comparePassword;
const Users = mongoose.model<UI>("User", UserSchema);
export default Users
