/* eslint-disable indent */
import Joi from 'joi-oid';
//const Joi = require('joi-oid')
import Logger from './logger';
import _ from 'lodash';

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

function transformData(data) {

    return _.map(data, item => ({
        id: item._id,
        collegeName: item.collegeName,
        address: item.address
    })
    );
}

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

export {
    CREATE_COLLEGE_SCHEMA,
    UPDATE_COLLEGE_SCHEMA,
    VALIDATE_ID_SCHEMA,
    VALIDATE_IDS_SCHEMA,
    LOGIN_USER_SCHEMA,
    REGISTER_USER_SCHEMA,
    EMAIL_INPUT_SCHEMA,
    validateRequestData,
    transformData,
    transformUserData,
    maskOption
};
// comment