/* eslint-disable indent */
import Joi from 'joi-oid';
//const Joi = require('joi-oid')
import Logger from './logger';
import _ from 'lodash';
import request from 'request';

const logger = new Logger('College', 'utils.js');

const CREATE_COLLEGE_SCHEMA = Joi.object().keys({
    collegeName: Joi.string().min(3),
    address: Joi.string().max(30)
});

const UPDATE_COLLEGE_SCHEMA = Joi.object().keys({
    id: Joi.objectId().required(),
    collegeName: Joi.string().min(3),
    address: Joi.string().max(30)
});

const VALIDATE_ID_SCHEMA = Joi.object().keys({
    id: Joi.objectId().required()
});

const VALIDATE_IDS_SCHEMA = Joi.object().keys({
    ids: Joi.array()
        .items(
            Joi.objectId().required()
        ).unique().required()
});

const VALIDATE_OTP_SCHEMA = Joi.object().keys({
    otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    userName: Joi.string().min(3).required()
});

const LOGIN_USER_SCHEMA = Joi.object().keys({
    userName: Joi.string().min(3).required(),
    password: Joi.string().required()
});

const REGISTER_USER_SCHEMA = Joi.object().keys({
    userName: Joi.string().min(3),
    password: Joi.string(),
    email: Joi.string(),
    created: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string()
});

const EMAIL_INPUT_SCHEMA = Joi.object().keys({
    created: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().regex(/^[a-zA-Z]*$/).min(1).max(15).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]*$/).min(1).max(15).required(),
    userName: Joi.string().min(1).max(20).required()
});

/**
 * 
 * @param {object} model 
 * @param {object} schema 
 */
function validateRequestData(model, schema) {

    const validateResult = schema.validate(model, { abortEarly: false });

    if (validateResult.error) {
        logger.error(`-validation error: ${logger.stringify(validateResult.error)}`);
        const errorDetails = validateResult.error.details.map(err => ErrorDetails(err.path[0], err.message, `Invalid ${err.path[0].trim()}`));
        console.log(errorDetails);
        throw buildClientError(errorDetails);
    }
}

function ErrorDetails(field, message, code) {
    const regex = /"/gi;

    return {
        field,
        message: message.replace(regex, ''),
        code
    };
}

function buildClientError(errDetails = []) {
    let error = new Error();
    error.details = errDetails;
    return error;
}

/**
 * 
 * @param {object} data 
 */
function transformData(data) {

    return _.map(data, item => ({
        id: item._id,
        collegeName: item.collegeName,
        address: item.address
    })
    );
}

/**
 * 
 * @param {object} data / userdata
 */
function transformUserData(data) {

    return _.map(data, item => ({
        id: item._id,
        userName: item.userName,
        email: item.email,
        created: item.created,
        firstName: item.firstName,
        lastName: item.lastName
    })
    );
}

/**
 * 
 * @param {string} option / key
 */
function maskOption(option) {

    let opt = {};

    switch (option) {
        case 'password':
            opt.maskWith = '*';
            opt.maxMaskedCharacters = 16;
            break;
        case 'email':
            opt.maskWith = '*';
            opt.unmaskedStartCharacters = 1;
            opt.unmaskedEndCharacters = 1;
            opt.maskAtTheRate = false;
            opt.maxMaskedCharactersBeforeAtTheRate = 3;
            opt.maxMaskedCharactersAfterAtTheRate = 2;
            break;
        default:
            break;
    }
    return opt;
}

/**
 * 
 * @param {Object} objVal 
 * @param {Array} keys // contain keys which used pick data from object
 */
function getValueFromResultByKeys(objVal, keys) {
    let result = {};


    // eslint-disable-next-line no-prototype-builtins
    if (objVal.hasOwnProperty('condition')) {
        result['icon'] = objVal.condition.icon;
    }

    result = { ..._.pick(_.cloneDeep(objVal), keys), ...result };

    return result;
}

/**
 * 
 * @param {Object} data // weather-api response
 */

async function transformWeatherData(data) {
    let res = Object.keys(data);
    let collection = {};
    let hourlyData = [];
    let keys = [
        {
            current: ['last_updated', 'temp_c', 'temp_f', 'wind_mph', 'wind_kph']
        },
        {
            forecast: ['date', 'day', 'astro', 'hour']
        },
        {
            day: ['maxtemp_c', 'maxtemp_f', 'mintemp_c', 'mintemp_f', 'avgtemp_c']
        },
        {
            astro: ['sunrise', 'sunset', 'moonrise', 'moonset']
        },
        {
            hour: ['time', 'temp_c', 'temp_f', 'wind_mph', 'wind_kph', 'wind_degree']
        }
    ];

    res.forEach((item, key) => {
        if (item === 'location') {
            collection['location'] = data[item];
        }
        if (item === 'current') {
            collection['current'] = getValueFromResultByKeys(data[item], keys[0].current);
        }
        if (item === 'forecast') {
            let forecastData = getValueFromResultByKeys(data[item].forecastday[0], keys[1].forecast);
            collection['forecastDay'] = {};

            collection['forecastDay']['date'] = forecastData.date;
            collection['forecastDay']['dayInfo'] = getValueFromResultByKeys(forecastData['day'], keys[2].day);
            collection['forecastDay']['astroInfo'] = getValueFromResultByKeys(forecastData['astro'], keys[3].astro);

            forecastData['hour'].map(item => {
                hourlyData.push(getValueFromResultByKeys(item, keys[4].hour));
            });

            collection['forecastDay']['hourlyData'] = hourlyData;
        }
    });

    return collection;
}

/**
 * 
 * @param {string} url  / contain url of news
 */
async function getNewsInfoFromUrl(url) {
    // eslint-disable-next-line no-undef
    return new Promise(function (resolve, reject) {
        request(url,
            function (error, response, body) {
                console.log(response);

                if (!error && response.statusCode === 200) {
                    response = JSON.parse(body);
                    resolve(response);
                }
                else {
                    console.log(`${response.statusCode} ${response.body}`);
                    reject(response);
                }
            });
    });
}


/**
 * 
 * @param {string} url  / contain url of weather
 */
async function getWeatherForecastFromUrl(url) {
    // eslint-disable-next-line no-undef
    return new Promise(function (resolve, reject) {
        request(url,
            function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    response = JSON.parse(body);
                    resolve(response);
                }
                else {
                    console.log(`${response.statusCode} ${response.body}`);
                    reject(response);
                }
            });
    });
}

export {
    CREATE_COLLEGE_SCHEMA,
    UPDATE_COLLEGE_SCHEMA,
    VALIDATE_ID_SCHEMA,
    VALIDATE_IDS_SCHEMA,
    VALIDATE_OTP_SCHEMA,
    LOGIN_USER_SCHEMA,
    REGISTER_USER_SCHEMA,
    EMAIL_INPUT_SCHEMA,
    validateRequestData,
    transformData,
    transformUserData,
    maskOption,
    getNewsInfoFromUrl,
    getWeatherForecastFromUrl,
    transformWeatherData
};
