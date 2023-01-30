const axios = require('axios');

class Strapi {
    constructor(jwt) {
        this.jwt = jwt;
        this.url = process.env.STRAPI_URL
    }

    async getPasswordlessAuthenticationLink(email){
        const path = '/api/passwordless/send-link';
        await axios.post(this.url + path, {email});
    }

    async loginViaToken(loginToken){
        const path = '/api/passwordless/login?loginToken=' + loginToken;
        const { data } = await axios.get(this.url + path);
        return data;
    }
}

module.exports = Strapi;
