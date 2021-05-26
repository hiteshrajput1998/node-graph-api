import CryptoJS from 'crypto-js';
import { validateRequestData, LOGIN_USER_SCHEMA } from '../../../utils';
import { User } from '../../../models';
import Logger from '../../../logger';
import GraphError from '../../../graphError';

const logger = new Logger('User', 'loginUser.js');

export default async (_, { data2 }, info) => {
    logger.log(`info: ${JSON.stringify(data2)}`);

    let data;

    try {

        // const encrypted = CryptoJS.AES.encrypt(JSON.stringify({ userName: "HRR", password: "hr1234" }), process.env.SECRET_KEY).toString();
        // console.log(encrypted);

        const bytes = CryptoJS.AES.decrypt(data2, "HRAlgorithm");
        console.log(`bytes: ${JSON.stringify(bytes)}`);
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

        const bytes = CryptoJS.AES.decrypt(user.password, "HRAlgorithm");
        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        console.log(`decryptPassword: ${decryptPass}`);
        // const encryptedPassword = CryptoJS.AES.encrypt(data.password, "HRAlgorithm").toString();
        // console.log(`encryptedPassword: ${encryptedPassword}`);


        if (data.password !== decryptPass) {
            throw new GraphError('Incorrect password!');
        }

        return {
            token: CryptoJS.AES.encrypt(user.userName + user.email, process.env.SECRET_KEY).toString()
        };
    } catch (error) {
        throw new GraphError(error.message);
    }
}