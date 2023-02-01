const axios = require('axios');
const qs = require('qs');

class Strapi {
    constructor(jwt) {
        this.jwt = jwt;
        this.url = process.env.STRAPI_URL
    }

    async getPasswordlessAuthenticationLink(email, context){
        const path = '/api/passwordless/send-link';
        await axios.post(this.url + path, {email, context});
    }

    async loginViaToken(loginToken){
        const path = '/api/passwordless/login?loginToken=' + loginToken;
        const { data } = await axios.get(this.url + path);
        return data;
    }

    async getTopics(queryObject){
        const path = '/api/topics';
        const query = queryObject ? "?" + qs.stringify(queryObject) : "";
        const { data } = await axios.get(this.url + path + query, {
            headers: {
                Authorization: `Bearer ${this.jwt}`
            }
        });

        return data
    }
}

module.exports = Strapi;
