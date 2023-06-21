import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        unique: true,
        minLength: [5, 'Username must be at least 5 characters long'],
        validate: [validator.isAlphanumeric, 'Please provide alphanumeric characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email address'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.validPassword = async function(providedPassword, userPassword) {
    return await bcrypt.compare(providedPassword, userPassword);
}

const User = mongoose.model('User', userSchema);

export { User };
