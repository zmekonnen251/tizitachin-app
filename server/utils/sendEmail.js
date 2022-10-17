import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
	// 1) Create a transporter
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: 'gmail',
			// secure: Boolean(process.env.EMAIL_SECURE),

			auth: {
				user: 'zmekonnen59@gmail.com',
				pass: 'mvonekslmrwyivtz',
			},
		});

		// Activate in gmail "less secure app" option
		await transporter.sendMail({
			from: 'zmekonnen59@gmail.com',
			to: options.email,
			subject: options.subject,
			text: options.message,
		});
		console.log('Email sent successfully');
	} catch (error) {
		console.log(error);
	}
};

export default sendEmail;
