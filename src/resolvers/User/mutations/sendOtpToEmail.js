import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import GraphError from '../../../graphError';
import Logger from '../../../logger';

const logger = new Logger('User', 'sendOtpToEmail.js');

export default async (_, { email }, info) => {
    logger.info(`SendOtpToEmail input email: ${email}`);

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: true });

    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            secure: true,
            auth: {
                user: 'hitesh.rajput@thegatewaycorp.co.in',
                pass: '',
            },
        });

        const mailOptions = {
            from: 'hitesh.rajput@thegatewaycorp.co.in',
            to: email,
            subject: 'OTP verification',
            html: `
                <div style="position:relative;background-color:#89CFF0;width:600px;height:230px;padding:20px;">     
                <div style="width:500px;position:relative;margin-left:40px;box-shadow: 0 2px 7px #dfdfdf;background:#fafafa;">
                    <div style="padding: 30px;">
                        <h5 style="margin-bottom: 18px;text-transform: uppercase;font-weight: 800; color: #363636;">Please enter the below mentioned OTP</h5>
                        <h2>${otp}</h2>
                        <div style="text-align:right;margin-top:-50px;">
                            <img src="https://picsum.photos/110/110" alt="asd" style="padding: 4px;line-height: 1.42857143;background-color: #fff;border: 1px solid #ddd;border-radius: 4px;-webkit-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;transition: all .2s ease-in-out;display: inline-block;max-width: 100%;height: auto;" />
                        </div>
                    </div>
                </div>
            </div>`
        };

        transporter.sendMail(mailOptions)
            .then(res => {
                console.log(res);
                return true;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (error) {
        logger.error(error);
        throw new GraphError(error);
    }
};