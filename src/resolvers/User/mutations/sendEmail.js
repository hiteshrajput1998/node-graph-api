import nodemailer from 'nodemailer';
import { upperCase } from 'lodash';
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { EMAIL_INPUT_SCHEMA, validateRequestData } from '../../../utils';

const logger = new Logger('User', 'sendEmail.js');

export default async (_, { input }, context, info) => {
    logger.log(`email argument: ${logger.stringify(input)}`);

    validateRequestData(input, EMAIL_INPUT_SCHEMA);

    const { email, firstName, lastName } = input;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hitesh1998.student@gmail.com',
                pass: '****',
            },
        });

        const mailOptions = {
            from: 'hitesh1998.student@gmail.com',
            to: email,
            subject: 'Registered confirmation',
            html: `
                <div style="position:relative;background-color:#89CFF0;width:600px;height:400px;">
                    <div style="display:flex;padding:20px;">
                        <img src="https://picsum.photos/80/80" alt="asd" style="border-radius:50%;margin-right:-15px;margin-top:-10px;z-index:10;" />
                        <h1 style="text-align:center;background-color:#003B73;color:white;padding:0 25px 0;">Welcome to our team!</h1>
                    </div>
                    <div style="width:500px;position:relative;margin-left:40px;box-shadow: 0 2px 7px #dfdfdf;background:#fafafa;">
                        <div style="padding: 30px;">
                            <span style="display: block;font-size: 12px;font-weight: 700;text-transform: uppercase;color: #ccc;margin-bottom: 18px;">Dear ${upperCase(firstName)} ${upperCase(lastName)},</span>
                            <h5 style="margin-bottom: 18px;text-transform: uppercase;font-weight: 800; color: #363636;">Thank you for joining us.</h5>
                            <p>We are excited to have you!</p>
                            <div style="text-align:right;margin-top:-50px;">
                                <img src="https://picsum.photos/110/110" alt="asd" style="padding: 4px;line-height: 1.42857143;background-color: #fff;border: 1px solid #ddd;border-radius: 4px;-webkit-transition: all .2s ease-in-out;-o-transition: all .2s ease-in-out;transition: all .2s ease-in-out;display: inline-block;max-width: 100%;height: auto;" />
                            </div>
                        </div>
                    </div>
                </div>`
        };

        // eslint-disable-next-line no-undef
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject({ err: err });
                }

                logger.log(`+email response: ${logger.stringify(info.response)}`);

                resolve({
                    message: 'Email successfully sent!',
                    data: info.response
                });
            });
        });
    } catch (error) {
        throw new GraphError(error.message);
    }
};