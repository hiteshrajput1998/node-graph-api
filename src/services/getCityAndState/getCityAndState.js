import request from 'request';

const URL = 'https://api.postalpincode.in/pincode';

export const getCityAndState = async (zipCode) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
        request(`${URL}/${zipCode}`,
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
};