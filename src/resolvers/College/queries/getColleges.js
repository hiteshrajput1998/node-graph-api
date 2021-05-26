import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { College } from '../../../models/';
import { transformData } from '../../../utils';

const logger = new Logger('College', 'getColleges.js');

export default async (parent, context, ctx, info) => {
    logger.log(`Auth: ${logger.stringify(context)}`);

    //info.cacheControl.setCacheHint({ maxAge: 10 });

    try {

        let response = await College.find();
        logger.log(`response: ${logger.stringify(response)}`);

        let finalResponse = transformData(response);
        logger.log(`finalResponse: ${logger.stringify(finalResponse)}`);

        return finalResponse;
    } catch (error) {
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