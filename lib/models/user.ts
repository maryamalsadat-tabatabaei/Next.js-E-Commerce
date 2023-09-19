import type { Ref } from "@typegoose/typegoose";
import { prop, getModelForClass, pre, mongoose } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

@pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
})
class User {
  @prop({ required: [true, "Please enter your name"] })
  name!: string;

  @prop({
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  })
  email!: string;

  @prop({
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  })
  password!: string;

  @prop({ type: mongoose.Schema.Types.Mixed })
  avatar?: {
    public_id?: string;
    url?: string;
  };

  @prop({ default: "user" })
  role!: string;

  @prop({ default: Date.now })
  createdAt!: Date;
}

export default User;

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your name"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your email"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter your password"],
//     minLength: [6, "Your password must be longer than 6 characters"],
//     select: false,
//   },
//   avatar: {
//     public_id: String,
//     url: String,
//   },
//   role: {
//     type: String,
//     default: "user",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 12);
// });

// export default mongoose.models.User || mongoose.model("User", userSchema);
