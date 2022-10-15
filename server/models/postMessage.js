import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	selectedFile: String,
	tags: [String],
	likes: {
		type: [String],
		default: [],
	},
	comments: { type: [String], default: [] },
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model('PostMeessage', postSchema);

export default PostMessage;
