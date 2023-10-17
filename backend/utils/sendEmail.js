const nodemailer = require("nodemailer");

module.exports.senduserMail = async (email,name) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: 'Welcome message',
			
			html:`<h3>Hurray...!<h3><br><p>${name}, Thanks for signing up with us</p><br>
			<p>Kind Regards,</p><br> <strong>Employee App</strong>`
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};