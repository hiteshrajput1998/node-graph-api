/* eslint-disable no-unused-vars */
import NodeCache from 'node-cache';
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { getNewsInfoFromUrl } from '../../../utils';

const logger = new Logger('News', 'getNews.json');

const cache = new NodeCache({ stdTTL: 5000 });

export default async (_parent, { country, lang }, _ctx, _info) => {
    logger.info('Started getNews');
    let response;

    try {
        let url = `https://gnews.io/api/v4/top-headlines?token=691b7111b0bf68e5f45a73950c86a3b0&country=${country}&lang=${lang}`;

        if (cache.has(url)) {
            response = cache.get(url);
        }
        else {
            response = await getNewsInfoFromUrl(url);
            cache.set(url, response);
        }

        logger.info(logger.stringify(response));

        return response;
    } catch (error) {
        throw new GraphError(error);
    }
};