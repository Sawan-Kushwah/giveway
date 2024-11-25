import 'dotenv/config'
import nodemailer from 'nodemailer';

function sendMailToVerify(receiversEmail, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.PASS_KEY
        },
    });

    async function main() {
        // send mail with defined transport object
        await transporter.sendMail({
            from: {
                name: "AuthPortal",
                address: process.env.EMAIL_ID
            }, // sender address
            to: receiversEmail,
            subject: `Verify AuthPortal Email ✔ `,
            html: ` <div style="font-size: 22px; margin-bottom: 8px;">Verfiy your Authportal Email by entring following code <br>
            <div style="color: #0ab1cd; text-decoration: underline; cursor: pointer; padding:9px;"> ${otp}</div>
        </div>`, // html body
        });

        console.log(`Email has been sent to ${receiversEmail}`);

    }

    main().catch(console.error);

}
export default sendMailToVerify