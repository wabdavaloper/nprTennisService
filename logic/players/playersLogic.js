const { Client } = require('pg');
const AuthDbData = require('../../db/connect_db.json');
const client = new Client(AuthDbData);
const db = require('../../db/db');

client.connect();

const getAllPlayersInfo = async () => {
    const res = await client.query(db.allPlayersInfo());
    console.log('get all players info');
    return res.rows;
}

module.exports = { getAllPlayersInfo }