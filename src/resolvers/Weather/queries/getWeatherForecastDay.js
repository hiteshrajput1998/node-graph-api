/* eslint-disable no-unused-vars */
import NodeCache from 'node-cache';
import GraphError from '../../../graphError';
import Logger from '../../../logger';
import { getWeatherForecastFromUrl, transformWeatherData } from '../../../utils';

const logger = new Logger('Weather', 'getWeatherForecastDay.js');

const cache = new NodeCache({ stdTTL: 5000 });

export default async (_parent, { cityName, days }, _ctx, _info) => {
    logger.info('Started getNews');
    let response;

    try {
        let url = `http://api.weatherapi.com/v1/forecast.json?key=b88fc770fc604ca18b0112250211308&q=${cityName}&days=${days}&aqi=no&alerts=no`;

        if (cache.has(url)) {
            response = cache.get(url);
            response = await transformWeatherData(response);
        }
        else {
            response = await getWeatherForecastFromUrl(url);
            cache.set(url, response);

            response = await transformWeatherData(response);
        }

        logger.info(`final response of getNews: ${logger.stringify(response)}`);

        return response;
    } catch (error) {
        throw new GraphError(error);
    }
};