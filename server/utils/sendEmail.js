import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Create a transporter
  try {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    post: Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.EMAIL_SECURE),


    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

    // Activate in gmail "less secure app" option
    await transporter.sendMail({
          from: 'Memories < ',
          to: options.email,
          subject: options.subject,
          text: options.message,
      })
      console.log("Email sent successfully");
  } catch (error) {
    console.log(error)
  }


  // 2) Define the email options
  