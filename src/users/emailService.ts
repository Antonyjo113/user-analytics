const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SOURCE_EMAIL_ID,  
    pass: process.env.SOURCE_EMAIL_PASSWORD 
  },
});

const sendWelcomeEmail = async (toEmail: string, userName: string) => {
  try {
    const info = await transporter.sendMail({
      from: 'antonyjo113@gmail.com', 
      to: toEmail,                                  
      subject: 'Welcome to Our Service',             
      text: `Hello ${userName},\n\nWelcome to our service! We are happy to have you.\n\nBest regards,\nYour Company`, // plain text body
      html: `<p>Hello ${userName},</p><p>Welcome to our service! We are happy to have you.</p><p>Best regards,<br>Your Company</p>`, // html body
    });

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default { sendWelcomeEmail };
