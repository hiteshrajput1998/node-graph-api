import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { College } from '../../../models/';
import { transformData } from '../../../utils';
import { logger2 } from '../../../bunyanLogger';

const logger = new Logger('College', 'getColleges.js');

export default async (parent, context, ctx, info) => {
    logger.log(`Auth: ${logger.stringify(context)}`);
    logger2.info(`Auth: ${logger.stringify(context)}`);

    //info.cacheControl.setCacheHint({ maxAge: 10 });

    try {

        let startTime =Date.now();
        logger.log(`startTime: ${ Math.round(startTime)}`);
        let response = await College.find().sort({collegeName: 1, address: -1});
        let endTime = Date.now();
        logger.log(`endTime: ${Math.round(endTime)}`);
        logger.log(`time to get in millisec: ${endTime - startTime}`);
        // logger.log(`response: ${logger.stringify(response)}`);
        // logger2.info(`response: ${logger.stringify(response)}`);

        let finalResponse = transformData(response);
        // logger.log(`finalResponse: ${logger.stringify(finalResponse)}`);
        // logger2.info(`finalResponse: ${logger.stringify(finalResponse)}`);

        return finalResponse;
    } catch (error) {
        logger2.error(error);
        throw new GraphError(error.message);
    }
};


//using pino logger

// import GraphError from '../../../graphError';
// import Logger from '../../../logger';
// import { College } from '../../../models/';
// import { transformData } from '../../../utils';

// import { logger } from '../../../pinoLogger';

// //const logger = new Logger('College', 'getColleges.js');

// export default async (parent, context, ctx, info) => {
//     logger.info(`Auth: ${JSON.stringify(context)}`);

//     info.cacheControl.setCacheHint({ maxAge: 10 });

//     try {

//         let response = await College.find();
//         logger.info(`response: ${JSON.stringify(response)}`);

//         let finalResponse = transformData(response);
//         logger.info(`finalResponse: ${JSON.stringify(finalResponse)}`);

//         return finalResponse;
//     } catch (error) {
//         throw new GraphError(error.message);
//     }
// };