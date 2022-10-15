import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

export default mongoose.model('Token', tokenSchema);
