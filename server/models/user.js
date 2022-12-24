import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	imageUrl: { type: String, required: false },
	verified: { type: Boolean, default: false },
	refreshToken: { type: String },
	id: { type: String },
});

export default mongoose.model('User', userSchema);
