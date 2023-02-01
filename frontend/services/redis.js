const { createClient } = require("redis")

class Redis {
    constructor() {
        this.client = createClient();
    }

    async connect(){
        await this.client.connect();
    }

    async get(key){
        return await this.client.get(key);
    }

    async set(key, value){
        return await this.client.set(key, value);
    }
}

module.exports = new Redis();