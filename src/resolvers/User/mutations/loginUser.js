import CryptoJS from 'crypto-js';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import { validateRequestData, LOGIN_USER_SCHEMA } from '../../../utils';
import { User, Otp } from '../../../models';
import Logger from '../../../logger';
import GraphError from '../../../graphError';

const logger = new Logger('User', 'loginUser.js');

const sendOTPEmail = (otp, email) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hitesh1998.student@gmail.com',
            pass: '',
        },
    });

    const mailOptions = {
        from: 'hitesh1998.student@gmail.com',
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

    // eslint-disable-next-line no-undef
    // return new Promise((resolve, reject) => {
    //     transporter.sendMail(mailOptions, (err, info) => {
    //         if (err) {
    //             reject({ err: err });
    //         }

    //         logger.log(`+email response: ${logger.stringify(info)}`);

    //         resolve();
    //     });
    // });
    transporter.sendMail(mailOptions)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
};

export default async (_, { data2 }, info) => {
    logger.log(`info: ${JSON.stringify(data2)}`);

    let data;
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });

    try {

        // const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ userName: "HRR", password: "hr1234" }), process.env.SECRET_KEY).toString();
        // console.log(encrypted);

        const bytes = CryptoJS.AES.decrypt(data2, 'HRAlgorithm');
        data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(`data: ${JSON.stringify(data)}`);
    } catch (error) {
        throw new GraphError('Invalid pass header!');
    }

    validateRequestData(data, LOGIN_USER_SCHEMA);

    try {

        let user = await User.findOne({ userName: data.userName });
        console.log(user);
        if (!user) {
            throw new GraphError('User not found!');
        }

        console.log(`user.password: ${JSON.stringify(user.password)}`);

        const bytes = CryptoJS.AES.decrypt(user.password, 'HRAlgorithm');
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        console.log(`decryptPassword: ${decryptPass}`);
        // const encryptedPassword = CryptoJS.AES.encrypt(data.password, "HRAlgorithm").toString();
        // console.log(`encryptedPassword: ${encryptedPassword}`);


        if (data.password !== decryptPass) {
            throw new GraphError('Incorrect password!');
        }

        let userNameExist = await Otp.findOne({ userName: user.userName });
        if (userNameExist) {
            await Otp.update({ userName: user.userName }, { $set: { otp: otp, created: new Date().toLocaleString() } });
        } else {
            await Otp.create({ userName: user.userName, otp: otp, created: new Date().toLocaleString() });
        }

        sendOTPEmail(otp, user.email);

        return {
            token: CryptoJS.AES.encrypt(user.userName + user.email, process.env.SECRET_KEY).toString(),
            message: 'OTP has sent to your email address!'
        };
    } catch (error) {
        throw new GraphError(error.message);
    }
};