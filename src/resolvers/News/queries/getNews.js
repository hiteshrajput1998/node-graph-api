/* eslint-disable no-unused-vars */
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { getNewsInfoFromUrl } from '../../../utils';

const logger = new Logger('News', 'getNews.json');

export default async (_parent, _context, _ctx, _info) => {
    logger.info('Started getNews');

    try {
        let response = await getNewsInfoFromUrl('https://gnews.io/api/v4/top-headlines?token=691b7111b0bf68e5f45a73950c86a3b0&country=in&lang=hi');
        logger.info(logger.stringify(response));

        return response;
    } catch (error) {
        throw new GraphError(error);
    }
};