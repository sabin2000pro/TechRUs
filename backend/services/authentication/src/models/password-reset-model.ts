import mongoose from 'mongoose';

interface IPasswordResetModel {
    owner: mongoose.Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
    expiresAt: Date;

}

const PasswordResetSchema = new mongoose.Schema<IPasswordResetModel>({
    owner: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "customer",
       required: [true, "Please specify the current owner of this password reset token"]
    },

    token: {
        type: String,
        required: [true, "Please specify the token"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAt: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

const PasswordReset = mongoose.model("PasswordReset", PasswordResetSchema);
export {PasswordReset}