import nodemailer from 'nodemailer';

export  async function sendOTP(email, otp) {
    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services as well
        auth: {
            user: process.env.EMAIL_ID, // Your email address
            pass: process.env.PASS, // Your email password
        },
    });

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully.');
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP.');
    }
}

